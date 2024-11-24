import { Body, Controller, Post } from '@nestjs/common';
import { ProgramBuilderService } from './services/program-builder.service';
import { ProgramTitleBody } from './data/models/program-title.model';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { ProgramChapter } from './data/models/program-chapter-response.model';

@Controller('program-builder')
export class ProgramBuilderController {
  constructor(private readonly programBuilderService: ProgramBuilderService) {}

  //TODO: add DTO
  @Post('get-keypoints')
  @ApiBody({
    schema: {
      example: {
        category: 'string',
        subCategory: 'string',
        title: 'string',
        keywords: ['string'],
      },
    },
    description: 'Program title body containing details to fetch keypoints',
  })
  @ApiResponse({ status: 200, description: 'Get keypoint from title' })
  public getKeypointFromTitle(
    @Body()
    program: {
      category: string;
      subCategory: string;
      title: string;
      keywords: string[];
    },
  ): Observable<string[]> {
    return this.programBuilderService
      .getKeypointFromTitle(
        program.category,
        program.subCategory,
        program.title,
        program.keywords,
      )
      .pipe(
        map((response) => {
          return response.result;
        }),
      );
  }

  @Post('get-chapters')
  @ApiBody({
    schema: {
      example: {
        category: 'string',
        subCategory: 'string',
        title: 'string',
        language: 'LangEnum',
        keywords: ['string'],
        keypoints: ['string'],
      },
    },
    description: 'Program chapter body containing details to fetch chapter',
  })
  @ApiResponse({
    status: 200,
    description: 'Get chapter from keypoint and title',
  })
  public getChapterFromKeypointAndTitle(
    @Body()
    program: {
      category: string;
      subCategory: string;
      title: string;
      keywords: string[];
      keypoints: string[];
    },
  ): Observable<ProgramChapter[]> {
    return this.programBuilderService
      .getChapterFromKeypointAndTitle(
        program.category,
        program.subCategory,
        program.title,
        program.keywords,
        program.keypoints,
      )
      .pipe(
        map((response) => {
          return response.result;
        }),
      );
  }

  @Post('get-suggestions-title')
  @ApiBody({
    schema: {
      example: {
        category: 'string',
        subCategory: 'string',
      },
    },
    description: 'Program title body containing details to fetch suggestions',
  })
  @ApiResponse({
    status: 200,
    description: 'Get suggestions title from category and subcategory',
  })
  public getSuggestionsTitleFromCategoryAndSubcategory(
    @Body() program: { category: string; subCategory: string },
  ): Observable<string[]> {
    return this.programBuilderService
      .getSuggestedTitlesByCategoryAndSubCategory(
        program.category,
        program.subCategory,
      )
      .pipe(
        map((response) => {
          return response.result;
        }),
      );
  }

  @Post('get-keywords')
  @ApiBody({
    schema: {
      example: {
        category: 'string',
        subCategory: 'string',
        title: 'string',
      },
    },
    description: 'Program title body containing details to fetch keywords',
  })
  @ApiResponse({ status: 200, description: 'Get keywords from title' })
  public getKeywordsFromTitle(
    @Body() program: { category: string; subCategory: string; title: string },
  ): Observable<string[]> {
    return this.programBuilderService
      .getKeywordsFromTitle(
        program.category,
        program.subCategory,
        program.title,
      )
      .pipe(
        map((response) => {
          return response.result;
        }),
      );
  }

  @Post('get-course-img')
  @ApiBody({
    schema: {
      example: {
        category: 'string',
        subCategory: 'string',
        title: 'string',
      },
    },
    description: 'Program title body containing details to fetch course image',
  })
  @ApiResponse({ status: 200, description: 'Get course image from title' })
  public getCourseImageFromTitle(
    @Body() program: { category: string; subCategory: string; title: string },
  ): Observable<{ url: string }> {
    return this.programBuilderService
      .getCourseImageFromTitle(
        program.category,
        program.subCategory,
        program.title,
      )
      .pipe(
        map((response) => {
          return { url: response };
        }),
      );
  }
}
