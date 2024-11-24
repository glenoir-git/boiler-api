import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class GptImgGenerateService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey:
        '',
    });
  }

  public generateImage(
    prompt: string,
    size: '256x256' | '512x512' | '1024x1024' = '1024x1024',
  ): Observable<string> {
    try {
      const response = this.openai.images.generate({
        prompt,
        n: 1, // Nombre d'images à générer
        size,
        model: 'dall-e-2', // Spécifie l'utilisation du modèle DALL·E 2
      });


      return from(response).pipe(
        map((response) => {
          if (response.data && response.data.length > 0) {
            // Retourne l'URL de la première image générée
            return response.data[0].url;
          } else {
            throw new Error('Aucune image générée');
          }
        }),
      );
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image :', error.message);
      throw new Error('Échec de la génération de l\'image. Veuillez réessayer plus tard.');
    }
  }

}