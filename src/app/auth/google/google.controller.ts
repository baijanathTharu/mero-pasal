import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/app/user/entities/user.entity';
import { AuthenticationGuard } from '../authentication.guard';
import { GetUser } from '../get-user.decorator';
import { GoogleGuard } from './google.guard';
import { GoogleService } from './google.service';

@Controller('/login/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth(): Promise<any> {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@GetUser() user: User) {
    // service for persisting user after redirect (req.user)
    /**
     * req.user contains following properties:
     * email
     * firstname
     * lastname
     * picture
     * serviceId
     * accessToken
     */

    return user;
  }

  @Get('status')
  @UseGuards(AuthenticationGuard)
  sendStatus(@GetUser() user: User) {
    return user;
  }

  @Get('/logout')
  @UseGuards(AuthenticationGuard)
  logout(@Req() req: Request) {
    req.logOut();
    return 'loggedout successfully';
  }
}
