import { OutputEnum } from '../enums/output.enum';
import { LangEnum } from '../enums/lang.enum';

export interface Prompt<T> {
  context: string[];
  output: OutputEnum;
  lang: LangEnum;
  outputObject: T;
  Action: string;
  Params: string[];
  token_amount: number;
  temperature: number;
}