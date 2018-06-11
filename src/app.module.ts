import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { CORSMiddleware } from './middlewares/cors.middleware';
import { AuthService } from 'modules/auth/auth.service';
import { ListModule } from './modules/list/list.module';
import { RequesterService } from './services/requester.service';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

@Module({
  imports: [UserModule, AuthModule, ListModule],
  controllers: [],
  providers: [RequesterService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const path: any = { path: '*', method: RequestMethod.ALL };
    consumer.apply(CORSMiddleware).forRoutes(path);
  }
}
