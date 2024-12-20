import { IsString, IsEmail, IsArray, IsObject, IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SubscriptionDto {
  @IsBoolean()
  isActive: boolean;

  @IsDate()
  expiryDate: Date;
}


export class CreateUserDto {
  @ApiProperty({ description: 'User\'s name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User\'s surname' })
  @IsString()
  surname: string;

  @ApiProperty({ description: 'User\'s username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'User\'s email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'URL of user\'s avatar', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'User\'s interests', type: [String] })
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty({ description: 'Users points' })
  @IsNumber()
  points: number;

  @ApiProperty({
    description: 'Users subscription details',
    type: 'object',
    properties: {
      isActive: { type: 'boolean' },
      expiryDate: { type: 'string', format: 'date-time' }
    }
  })
  @IsObject()
  subscription: SubscriptionDto;
}