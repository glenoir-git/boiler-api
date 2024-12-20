import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    const newUser = {
      ...registerUserDto,
      keywords: [],
      subscription: {
        isActive: false,
        expiryDate: null,
      },
      points: 1,
    };
    return this.userRepository.create(newUser);
  }

  async getUserDetails(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUserPreferences(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }
}