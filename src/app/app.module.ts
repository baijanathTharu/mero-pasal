import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './auth/google/google.module';
import { SessionEntity } from './auth/session.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { ShopModule } from './shop/shop.module';
import { Product } from './product/entities/product.entity';

/**
 * production => .env.production
 * development => .env.development
 * test => .env.test
 */

let envFilePath = '';

switch (process.env.ENVIRONMENT) {
  case 'development':
    envFilePath = '.env.development';
    break;
  case 'production':
    envFilePath = '.env.production';
    break;
  case 'test':
    envFilePath = '.env.test';
    break;
  default:
    envFilePath = '.env.development';
    break;
}

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      username: process.env.MYSQL_DB_USERNAME,
      port: Number.parseInt(process.env.MYSQL_DB_PORT),
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: [SessionEntity, User, Product],
      synchronize: true,
    }),
    GoogleModule,
    UserModule,
    ProductModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
