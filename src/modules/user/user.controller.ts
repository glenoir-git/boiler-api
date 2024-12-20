import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../../core/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/register.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiBody({ type: RegisterUserDto })
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiResponse({ status: 200, description: 'User details retrieved successfully.' })
  async getUserDetails(@Param('id') id: string) {
    return this.userService.getUserDetails(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user preferences' })
  @ApiResponse({ status: 200, description: 'User preferences updated successfully.' })
  @ApiBody({ type: UpdateUserDto })
  async updateUserPreferences(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserPreferences(id, updateUserDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('firebase'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user details' })
  @ApiResponse({ status: 200, description: 'Current user details retrieved successfully.' })
  async getCurrentUser(@CurrentUser() user: any) {
    return this.userService.getUserDetails(user.uid);
  }
}