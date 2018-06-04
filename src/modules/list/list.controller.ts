import { Controller, UseGuards, Param, Get, Post, Put, Body, Res, Headers, Req } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import { ListService } from './list.service';
import { AuthService } from '../auth/auth.service';

@UseGuards(AuthGuard('jwt'))
@Controller('list')
export class ListController {

  constructor(private listService: ListService, private authService: AuthService) { }

  @Get(':id')
  GetList(@Param('id') id) {
    return 'You are getting list ' + id;
  }

  @Post()
  async CreateList(@Body() body, @Headers('authorization') authToken) {
    console.log(authToken);
    authToken = authToken.split(' ')[1];
    const userId = this.authService.getUserFromAuth(authToken);
    console.log('GOT USER ' + userId);
    return await Promise.resolve(this.listService.createList(body));
  }

  @Post(':id')
  async AddListDetail(@Body() body, @Param('id') id) {
    return await this.listService.addDetail(id, body);
  }
}
