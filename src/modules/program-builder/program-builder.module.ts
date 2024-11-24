import { Module } from '@nestjs/common';
import { GptGenerateService } from '../gpt-generate';
import { ProgramBuilderService } from './services/program-builder.service';
import { ProgramBuilderController } from './program-builder.controller';
import { GptImgGenerateService } from '../gpt-generate/services/gpt-img-generate.service';

@Module({
  imports: [],
  controllers: [ProgramBuilderController],
  providers: [GptGenerateService, ProgramBuilderService, GptImgGenerateService],
})
export class ProgramBuilderModule {}