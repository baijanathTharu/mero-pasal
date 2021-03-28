import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {
  async createShop(createShopDto: CreateShopDto, user: User): Promise<Shop> {
    const { name, description } = createShopDto;

    const shop = new Shop();
    shop.name = name;
    shop.description = description;
    shop.user = user;

    await shop.save();

    delete shop.user;
    return shop;
  }
  async getAllShops(): Promise<Shop[]> {
    const query = this.createQueryBuilder();

    const shops = await query.getMany();
    return shops;
  }

  async getShopById(id: number): Promise<Shop> {
    const shop = await this.findOne({ id });

    if (!shop) {
      throw new NotFoundException(`Shop with id '${id}' not found`);
    }

    return shop;
  }

  async searchShops(searchShopDto: SearchShopDto): Promise<Shop[]> {
    const { search } = searchShopDto;
    const query = this.createQueryBuilder('shop');

    if (search) {
      query.andWhere(
        'shop.name LIKE :search or shop.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    const shops = await query.getMany();
    return shops;
  }

  async updateShop(
    id: number,
    updateShopDto: UpdateShopDto,
    user: User,
  ): Promise<Shop> {
    const { name, description } = updateShopDto;

    const shop = await this.getShopById(id);

    if (shop.userId !== user.id) {
      throw new UnauthorizedException();
    }

    if (name) {
      shop.name = name;
    }

    if (description) {
      shop.description = description;
    }

    await shop.save();
    return shop;
  }

  async deleteShop(id: number, user: User): Promise<DeleteResult> {
    const shop = await this.getShopById(id);

    if (user.id !== shop.userId) {
      throw new UnauthorizedException();
    }

    const deleted = await this.delete({ id });

    if (!deleted.affected) {
      throw new BadRequestException(`Product with id '${id} not available`);
    }

    return deleted;
  }
}
