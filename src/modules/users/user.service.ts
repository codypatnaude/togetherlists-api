import { Injectable, Inject, forwardRef } from '@nestjs/common';
import User from './user.entity';
import {CreateUserDTO} from './createUser.dto';
import { AuthService } from '../auth/auth.service';
import {plainToClass} from 'class-transformer';
import {validate} from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async findAll(): Promise<User[]> {
    return await User.findAll<User>();
  }

  async findOne(criteria: any): Promise<User> {
    return await User.findOne(criteria);
  }

  async createUser(plainUser: CreateUserDTO){

    const user: CreateUserDTO = plainToClass(CreateUserDTO, plainUser);

    const errors = await validate(user);

    if (errors.length) {
      throw errors;
    }

    const creds = {
      username: user.username,
      password: user.password,
    };

    user.password = this.authService.hashPassword(user.password);
    await User.create(user);

    const token = await this.authService.generateAuthToken(creds);
    return {
      success: true,
      token,
    };
  }
}
