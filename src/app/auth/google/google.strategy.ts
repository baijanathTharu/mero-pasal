import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/app/user/user.repository';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `http://localhost:${process.env.SERVER_PORT}/api/login/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const googleUser = {
      email: emails[0].value,
      first_name: name.givenName,
      last_name: name.familyName,
      // picture: photos[0].value,
      service_id: id,
    };
    /**
     * create user here instead in controller
     */
    const appendUserInReq = await this.userRepository.createUser(googleUser);
    done(null, appendUserInReq);
  }
}
