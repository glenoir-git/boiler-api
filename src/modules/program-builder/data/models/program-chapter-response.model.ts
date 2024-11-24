export interface ProgramChapter {
  title: string;
  description: string;
  subChapters: subChapter[];
  difficulty: string;
  shouldBeCovered: boolean;
}

export interface subChapter {
  title: string;
  difficulty: string;
  recommendedSlide: number;
  shouldBeCovered: boolean;
}
