import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done) {
    // console.log('serialize user: ', user);
    done(null, user);
  }

  async deserializeUser(user: any, done) {
    // console.log('deserialize user: ', user);
    done(null, user);
  }
}
