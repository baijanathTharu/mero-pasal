import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {
  constructor(@InjectRepository(Shop) private shopRepository: ShopRepository) {}

  createShop(createShopDto: CreateShopDto, user: User) {
    return this.shopRepository.createShop(createShopDto, user);
  }

  getAllShops() {
    return this.shopRepository.getAllShops();
  }

  searchShops(searchShopDto: SearchShopDto) {
    return this.shopRepository.searchShops(searchShopDto);
  }

  getShopById(id: number) {
    return this.shopRepository.getShopById(id);
  }

  updateShop(id: number, updateShopDto: UpdateShopDto, user: User) {
    return this.shopRepository.updateShop(id, updateShopDto, user);
  }

  deleteShop(id: number, user: User) {
    return this.shopRepository.deleteShop(id, user);
  }
}
