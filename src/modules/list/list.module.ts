import { Module } from '@nestjs/common';
import { ListGateway } from './list.gateway';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { RequesterService } from 'services/requester.service';

@Module({
  providers: [ListGateway, ListService, RequesterService],
  controllers: [ListController],
  imports: [AuthModule],
})
export class ListModule {}
