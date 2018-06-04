import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import {JwtPayload} from '../../interfaces/jwt.payload.interface';
import { UserService } from '../users/user.service';
import { AppConfig } from '../../config';

@Injectable()
export class AuthService {
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

    return true;
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
}
