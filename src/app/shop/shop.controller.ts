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
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { SearchShopDto } from './dto/search-shop.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthenticationGuard } from '../auth/authentication.guard';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  createShop(
    @Body(ValidationPipe) createShopDto: CreateShopDto,
    @GetUser() user: User,
  ) {
    return this.shopService.createShop(createShopDto, user);
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
  @UseGuards(AuthenticationGuard)
  updateShop(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateShopDto: UpdateShopDto,
    @GetUser() user: User,
  ) {
    return this.shopService.updateShop(id, updateShopDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthenticationGuard)
  deleteShop(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.shopService.deleteShop(id, user);
  }
}
