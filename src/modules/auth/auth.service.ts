import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import {JwtPayload} from '../../interfaces/jwt.payload.interface';
import { UserService } from '../users/user.service';
import { AppConfig } from '../../config';

@Injectable()
export class AuthService {

  private user;

  constructor(private userService: UserService) { }

  async generateAuthToken(creds: any) {

    const user = await this.userService.findOne({
      where: {
        username: creds.username,
        password: this.hashPassword(creds.password),
      },
    });
    if (!user) throw new Error('Invalid Credentials');

    const payload = {
      id: user.id,
      email: user.email,
    };

    return await jwt.sign(payload, AppConfig.jwt.secret, {expiresIn: 3600});
  }

  async verifyAuthToken(token) {
    const decoded: any = jwt.verify(token, AppConfig.jwt.secret);
    const user = await this.validateUser(decoded);
    if (!user) throw new Error('Invalid Token');

    return user;
  }

  async validateUser(userToValidate: JwtPayload){
    return await this.userService.findOne({
      where: {
        email: userToValidate.email,
        id: userToValidate.id,
      },
    });
  }

  getUserFromAuth(token){
    const decoded: any = jwt.verify(token, AppConfig.jwt.secret);
    return decoded.id;
  }

  hashPassword(password: string) {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  setUser(token: string) {
    this.user = token;
  }

  getUser() {
    if (!this.user) {
      throw new Error('User not authenticated');
    }
    return this.user;
  }
}
