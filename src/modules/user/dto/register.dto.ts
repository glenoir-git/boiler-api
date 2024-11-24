import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
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
}