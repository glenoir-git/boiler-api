import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { Prompt } from '../datas/models/prompt.model';
import { ChatCompletionMessageParam } from 'openai/resources';
import { from, map, Observable } from 'rxjs';
import { GenOutput } from '../datas/models/gen-output.model';

@Injectable()
export class GptGenerateService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey:
        '',
    });
  }

  public generateResponseJson<T>(prompt: Prompt<T>): Observable<GenOutput<T>> {
    try {
      let messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: prompt.output },
      ];
      if (prompt.outputObject) {
        messages.push({
          role: 'system',
          content: `You must strictly adhere to the JSON format. Example output (do not add ''' or any extra symbols): ${JSON.stringify(prompt.outputObject)}`,
        });
      }
      if (prompt.lang) {
        messages.push({ role: 'system', content: `language: ${prompt.lang}` });
      }
      if (prompt.context) {
        messages.push({
          role: 'system',
          content: `context: ${prompt.context.join(' ')}`,
        });
      }
      if (prompt.Action) {
        messages.push({ role: 'user', content: `Action: ${prompt.Action}` });
      }
      if (prompt.Params) {
        messages.push({
          role: 'user',
          content: `Params: ${prompt.Params.join(' ')}`,
        });
      }
      const completion = this.openai.chat.completions.create({
        messages,
        model: 'gpt-4o-mini',
        max_tokens: prompt.token_amount,
        temperature: prompt.temperature,
      });

      return from(completion).pipe(
        map((response) => {
          try {

            const responseMessages: T = JSON.parse(
              response.choices[0].message.content,
            );
            return {
              result: responseMessages,
              inputTokens: response.usage.prompt_tokens,
              outputTokens: response.usage.completion_tokens,
              totalAmount: response.usage.total_tokens,
            };
          } catch (error) {
            console.error('Error parsing response from GPT-4:', error);
            console.log(`&14${response.choices[0].message.content}&14`);
            throw new Error('Failed to parse GPT-4 response');
          }
        }),
      );
    } catch (error) {
      console.error('Error generating response from GPT-3.5:', error);
      throw new Error('Failed to generate GPT-3.5 response');
    }
  }
}
