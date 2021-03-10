import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticationGuard } from '../authentication.guard';
import { GoogleGuard } from './google.guard';

@Controller('/login/google')
export class GoogleController {
  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth(): Promise<any> {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req: Request) {
    // service for persisting user after redirect (req.user)
    return { req: req.user };
  }

  @UseGuards(AuthenticationGuard)
  @Get('status')
  sendStatus(@Req() req: Request) {
    return req.user;
  }

  @Get('/logout')
  @UseGuards(AuthenticationGuard)
  logout(@Req() req: Request) {
    req.logOut();
    return 'loggedout successfully';
  }
}
