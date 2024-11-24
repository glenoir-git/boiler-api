import { Observable, tap } from 'rxjs';
import { ProgramKeypointResponse } from '../data/models/program-keypoint.model';
import { Injectable } from '@nestjs/common';
import { ProgramTitleBody } from '../data/models/program-title.model';
import {
  GenOutput,
  GptGenerateService,
  LangEnum,
  OutputEnum,
  Prompt,
} from '../../gpt-generate';
import { ProgramChapterBody } from '../data/models/program-chapter-body.model';
import { ProgramChapter } from '../data/models/program-chapter-response.model';
import { GptImgGenerateService } from '../../gpt-generate/services/gpt-img-generate.service';

@Injectable()
export class ProgramBuilderService {
  constructor(
    private readonly gptGenerateService: GptGenerateService,
    private readonly gptImgGenerateService: GptImgGenerateService,
    ) {}

  public getKeypointFromTitle(
    category: string,
    subCategory: string,
    title: string,
    keywords: string[],
  ): Observable<GenOutput<string[]>> {
    let exempleResponse: string[] = [
      'Key point 1',
      'Key point 2',
      'Key point 3',
    ];

    let prompt: Prompt<string[]> = {
      context: [
        'Instructions :',
        '1. Génère une liste organisée de **keypoints** qui structureront le contenu du cours.',
        ' - **Essentiels** : Les notions ou concepts fondamentaux pour bien comprendre le sujet (ex. : "Postures de base en yoga", "Techniques rythmiques en batterie", "Les indicateurs techniques principaux").',
        '- **Avancés et créatifs** : Des idées plus approfondies ou innovantes qui enrichiront le cours (ex. : "Yoga et spiritualité", "Improvisation en batterie", "Éviter les pièges courants en trading").',
        '2. Fournis au moins **15 keypoints**, classés par priorité (de "fondamentaux" à "exploration créative").',
        'Si nécessaire, propose des variantes ou des alternatives pour permettre un maximum de flexibilité à l’utilisateur.',
      ],
      output: OutputEnum.JSON,
      lang: LangEnum.FRENCH,
      outputObject: exempleResponse,
      Action:
        'Je construis un cours structuré basé sur les informations suivantes :',
      Params: [
        `Category: ${category}`,
        `Subcategory: ${subCategory}`,
        `Title: ${title}`,
        `Keywords: ${keywords.join(' ')}`,
      ],
      token_amount: 10000,
      temperature: 0.75,
    };

    return this.gptGenerateService.generateResponseJson<string[]>(prompt).pipe(
      tap((response) => {
        console.log(response.outputTokens);
        console.log(response.inputTokens);
      }),
    );
  }

  public getSuggestedTitlesByCategoryAndSubCategory(
    category: string,
    subCategory: string,
  ): Observable<GenOutput<string[]>> {
    let exempleResponse: string[] = [
      'Suggested title 1',
      'Suggested title 2',
      'Suggested title 3',
    ];

    let prompt: Prompt<string[]> = {
      context: [
        'Instructions :',
        '1. Génère une liste de **5 à 10 titres variés** pour un cours dans ce domaine, qui reflètent bien le sujet choisi.',
        '2. Les titres doivent inclure à la fois des options :',
        '- **Directes et évidentes** (ex. : "Apprendre les bases de la méditation guidée", "Jouer du piano en 30 jours").',
        '- **Créatives et engageantes** (ex. : "Atteindre la pleine conscience à travers la méditation", "De novice à maestro : maîtriser le piano rapidement").',
        '3. Si pertinent, inclut des titres captivants qui reflètent des objectifs ou des bénéfices clairs pour l\'utilisateur (ex. : Maximisez vos profits en 5 étapes simples).',
        '4. Adapte les suggestions à un public général sans jargon technique, sauf si la sous-catégorie l\'exige.',
        'Les titres doivent être clairs, attractifs, et adaptés à des apprenants ayant différents niveaux de compétence (débutant, intermédiaire, avancé).',
      ],
      output: OutputEnum.JSON,
      lang: LangEnum.FRENCH,
      outputObject: exempleResponse,
      Action:
        'Je construis un cours personnalisé sur un sujet choisi par l\'utilisateur. Voici les informations disponibles :',
      Params: [category, subCategory],
      token_amount: 500,
      temperature: 0.8,
    };

    return this.gptGenerateService.generateResponseJson<string[]>(prompt).pipe(
      tap((response) => {
        console.log(response.outputTokens);
        console.log(response.inputTokens);
      }),
    );
  }

  public getKeywordsFromTitle(
    category: string,
    title: string,
    subtitle: string,
  ): Observable<GenOutput<string[]>> {
    let exempleResponse: string[] = ['keyword1', 'keyword2', 'keyword3'];

    let prompt: Prompt<string[]> = {
      context: [
        'Instructions :',
        '1. Génère une liste de **15 à 20 mots-clés pertinents** pour un cours sur ce sujet, qui complètent le titre et la sous-catégorie.',
        '2. Les mots-clés doivent inclure des termes spécifiques au sujet, des concepts clés, des compétences requises, des outils ou des technologies associés, etc.',
        '3. Si pertinent, inclut des termes plus avancés ou spécialisés qui enrichissent la compréhension du sujet et offrent des perspectives plus approfondies.',
        '4. Adapte les suggestions à un public général sans jargon technique, sauf si la sous-catégorie l\'exige.',
        'Les mots-clés doivent être clairs, pertinents, et adaptés à des apprenants ayant différents niveaux de compétence (débutant, intermédiaire, avancé).',
      ],
      output: OutputEnum.JSON,
      lang: LangEnum.FRENCH,
      outputObject: exempleResponse,
      Action:
        'Je construis un cours personnalisé sur un sujet choisi par l\'utilisateur. Voici les informations disponibles :',
      Params: [category, title, subtitle],
      token_amount: 500,
      temperature: 0.8,
    };

    return this.gptGenerateService.generateResponseJson<string[]>(prompt).pipe(
      tap((response) => {
        console.log(response.outputTokens);
        console.log(response.inputTokens);
      }),
    );
  }

  public getChapterFromKeypointAndTitle(
    category: string,
    subCategory: string,
    title: string,
    keywords: string[],
    keypoints: string[],
  ): Observable<GenOutput<ProgramChapter[]>> {
    let exempleResponse: ProgramChapter[] = [
      {
        title: 'Chapter 1', description: 'description', subChapters: [
          { title: 'Subchapter 1', difficulty: 'easy',recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 2', difficulty: 'medium', recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 3', difficulty: 'hard',recommendedSlide: 25, shouldBeCovered: false },
        ], difficulty: 'easy', shouldBeCovered: true,
      },
      {
        title: 'Chapter 2', description: 'description', subChapters: [
          { title: 'Subchapter 1', difficulty: 'easy',recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 2', difficulty: 'medium',recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 3', difficulty: 'hard',recommendedSlide: 25, shouldBeCovered: false },
        ], difficulty: 'medium', shouldBeCovered: true,
      },
      {
        title: 'Chapter 3', description: 'description', subChapters: [
          { title: 'Subchapter 1', difficulty: 'easy',recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 2', difficulty: 'medium',recommendedSlide: 25, shouldBeCovered: true },
          { title: 'Subchapter 3', difficulty: 'hard',recommendedSlide: 25, shouldBeCovered: false },
        ], difficulty: 'hard', shouldBeCovered: true,
      },

    ];

    let prompt: Prompt<ProgramChapter[]> = {
      context: [
        'Instructions :',
        '1. Génère une liste de **3 à 7 chapitre variés** pour un cours dans ce domaine, qui reflètent bien le sujet choisi et les mots-clés associés.',
        '2. Les chapitre doivent inclure à la fois des options :',
        '- **Directes et évidentes** (ex. : "Apprendre les bases de la méditation guidée", "Jouer du piano en 30 jours").',
        '- **Créatives et engageantes** (ex. : "Atteindre la pleine conscience à travers la méditation", "De novice à maestro : maîtriser le piano rapidement").',
        '3. Si pertinent, inclut des titres captivants qui reflètent des objectifs ou des bénéfices clairs pour l\'utilisateur (ex. : Maximisez vos profits en 5 étapes simples).',
        '7. pour chaque sous chapitre, tu peux mettre la difficulté de ce sous chapitre, soit easy, medium, hard., tu peux mettre shouldBeCovered à true ou false en fonction de l\'importance de ce sous chapitre.',
        '8. Pour chaque titre, génère une liste de chapitres et de sous-chapitres qui couvrent les keypoints et le sujet de manière détaillée et progressive.',
        '9. Les chapitres doivent être organisés de manière logique et cohérente, en suivant une progression naturelle et pédagogique.',
        '10. Les sous-chapitres doivent être estimé avec un nombre recommandé de slide entre 10 et 50, avec chaque notion sous jaceante représenté par le bon nombre de slide.',
      ],
      output: OutputEnum.JSON,
      lang: LangEnum.FRENCH,
      outputObject: exempleResponse,
      Action:
        'Je construis un cours structuré basé sur les informations suivantes :',
      Params: [
        category,
        subCategory,
        title,
        keywords.join(' '),
        keypoints.join(' '),
      ],
      token_amount: 10000,
      temperature: 0.75,
    };

    return this.gptGenerateService.generateResponseJson<ProgramChapter[]>(prompt).pipe(
      tap((response) => {
        console.log(response.outputTokens);
        console.log(response.inputTokens);
      }),
    );
  }

  public getCourseImageFromTitle(
    category: string,
    subCategory: string,
    title: string,
  ): Observable<string> {
    let prompt = `A low-poly art icon for a course on "${title}", representing ${subCategory} in ${category}, with bright pastel colors and no text or logos.`;

    return this.gptImgGenerateService.generateImage(prompt, '256x256');
  }
}
