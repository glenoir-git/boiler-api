import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'User\'s avatar URL' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ description: 'User\'s interests', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}