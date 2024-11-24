import { ProgramTitleBody } from './program-title.model';

export interface ProgramChapterBody extends ProgramTitleBody {
  keypoints: string[];
  additionalKeyWords: string[];
}