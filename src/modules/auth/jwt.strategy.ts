import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from '../../interfaces/jwt.payload.interface';
import {AppConfig} from '../../config';
import { RequesterService } from 'services/requester.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService, private requesterService: RequesterService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AppConfig.jwt.secret,
    });
    console.log('JWT created');
  }

  async validate(payload: JwtPayload, done: (exception: Error, b: any) => void) {
    console.log('JWT PAYLOAD');
    console.log(payload);
    const user = await this.authService.validateUser(payload);
    if (!user){
      return done(new UnauthorizedException(), false);
    }
    this.requesterService.setUser(user.toJSON());
    done(null, user);
  }
}