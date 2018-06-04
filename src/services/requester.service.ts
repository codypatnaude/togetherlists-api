import { Injectable } from '@nestjs/common';

@Injectable()
export class RequesterService {
  private user;

  async setUser(user) {
    if (!user.id){
      throw new Error('User must have an ID');
    }

    this.user = user;
  }

  getUser(){
    if (!this.user){
      throw new Error('User not set');
    }

    return this.user;
  }

}
