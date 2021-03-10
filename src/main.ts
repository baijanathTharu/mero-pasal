import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm/out';
import * as session from 'express-session';
import * as passport from 'passport';
import { getRepository } from 'typeorm';
import { AppModule } from './app/app.module';
import { SessionEntity } from './app/auth/session.entity';

const PORT = process.env.SERVER_PORT || 8001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepo = getRepository(SessionEntity);

  app.setGlobalPrefix('api');

  app.use(
    session({
      cookie: {
        maxAge: 86400000,
      },
      secret: process.env.SESSION_SECRET || 'afgagfahghg',
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore().connect(sessionRepo),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => console.log(`Listening at localhost:${PORT}`));
}
bootstrap();
