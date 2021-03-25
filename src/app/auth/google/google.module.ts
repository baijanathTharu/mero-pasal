import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/app/user/user.repository';
import { SessionSerializer } from '../session';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [GoogleController],
  providers: [GoogleStrategy, SessionSerializer, GoogleService],
  exports: [PassportModule],
})
export class GoogleModule {}
