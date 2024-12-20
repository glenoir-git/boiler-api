import { Injectable } from '@nestjs/common';
import { firestore } from '../../config/firebase.config';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserRepository {
  private readonly userCollection = firestore.collection('users');

  async create(createUserDto: CreateUserDto): Promise<User> {
    const docRef = await this.userCollection.add(createUserDto);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as User;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.userCollection.doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } as User : null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userCollection.doc(id).update(instanceToPlain(updateUserDto));
    return this.findById(id);
  }
}