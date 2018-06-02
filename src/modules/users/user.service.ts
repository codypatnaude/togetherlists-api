import { Injectable, Inject } from '@nestjs/common';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor() {}

  async findAll(): Promise<User[]> {
    return await User.findAll<User>();
  }

  async findOne(criteria: any): Promise<User> {
    return await User.findOne(criteria);
  }

  createUser(user){
    return User.create(user);
  }

  private validateUser(user: User){
    if (
      !user.username || !user.username.length ||
      !user.email || !user.email.length ||
      !user.phone || !user.phone.length ||
      !user.first_name || !user.first_name.length ||
      !user.last_name || !user.last_name.length ||
      !user.password || !user.password.length
    ) throw new Error('Invalid structure for user object');

    return User.create<User>(user);
  }
}
