import { Difficulty } from '../enums/difficulty.enums';
import { LangEnum } from '../../../gpt-generate';

export interface ProgramTitleBody {
  category: string;
  subCategory: string;
  title: string;
  language: LangEnum;
  difficulty: Difficulty[];
}