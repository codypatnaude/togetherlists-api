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
  }

  async validate(payload: JwtPayload, done: (exception: Error, b: any) => void) {
    const user = await this.authService.validateUser(payload);
    if (!user){
      return done(new UnauthorizedException(), false);
    }
    this.authService.setUser(user.get());
    done(null, user);
  }
}