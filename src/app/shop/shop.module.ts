import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopRepository } from './shop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ShopRepository])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
