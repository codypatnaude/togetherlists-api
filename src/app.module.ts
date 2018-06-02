import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { CORSMiddleware } from './middlewares/cors.middleware';
import { AuthService } from 'modules/auth/auth.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const path: any = { path: '*', method: RequestMethod.ALL };
    consumer.apply(CORSMiddleware).forRoutes(path);
  }
}
