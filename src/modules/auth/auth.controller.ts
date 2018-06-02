import { Controller, Get, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthGuard} from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  test(@Res() res) {
    res.json({ message: 'this is a test' });
  }

  @Post()
  login(@Body() creds: any, @Res() res) {
    console.log('Someone\'s logging in');
    console.log(creds);
    this.authService.generateAuthToken(creds).then(
      token => {
        res.json({
          success: true,
          token,
        });
      },
      errs => {
        console.log(errs);
        res.status(500).json(errs);
      },
    );
  }

  @Post('/verify')
  verifyAuthToken(@Body() data: any, @Res() res) {
    this.authService
      .verifyAuthToken(data.token)
      .then(verified => res.json(verified), err => res.status(500).json(err));
  }
}
