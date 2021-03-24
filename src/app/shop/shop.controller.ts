import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body(ValidationPipe) createShopDto: CreateShopDto) {
    return this.shopService.createShop(createShopDto);
  }

  @Get()
  getAllShops() {
    return this.shopService.getAllShops();
  }

  @Get('/search')
  searchShops(@Query(ValidationPipe) searchShopDto: SearchShopDto) {
    return this.shopService.searchShops(searchShopDto);
  }

  @Get('/:id')
  getShopById(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.getShopById(id);
  }

  @Put('/:id')
  updateShop(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateShopDto: UpdateShopDto,
  ) {
    return this.shopService.updateShop(id, updateShopDto);
  }

  @Delete('/:id')
  deleteShop(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.deleteShop(id);
  }
}
