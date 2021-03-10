import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../session';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [GoogleController],
  providers: [GoogleStrategy, SessionSerializer],
  exports: [PassportModule],
})
export class GoogleModule {}
