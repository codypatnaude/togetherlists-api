import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from '../../interfaces/jwt.payload.interface';
import {AppConfig} from '../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService){
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
    done(null, user);
  }
}