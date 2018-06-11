import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../users/user.module';
import { RequesterService } from 'services/requester.service';
import { UserService } from '../users/user.service';

@Module({
  imports: [UserModule],
  providers: [UserService, AuthService, JwtStrategy, RequesterService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
