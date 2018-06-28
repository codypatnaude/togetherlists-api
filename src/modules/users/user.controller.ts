import { Controller, Post, Get, Res, Req, UseGuards, Body } from '@nestjs/common';
import { UserService } from './user.service';
import User from './user.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Res() res) {
    this.userService.findAll().then(
      recs => res.json(recs),
      err => console.log(err),
    );
  }

  @Post()
  createUser(@Body() body, @Res() res){
    console.log('creating user');
    console.log(body);
    this.userService.createUser(body)
    .then(
      user => res.json(user),
      err => res.status(500).send(err),
    );
  }
}
