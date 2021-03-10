import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('body: ', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll(@Query() paginationDto: PaginationDto) {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.userService.findAll(
      {},
      {
        ...paginationDto,
        limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
      },
    );
  }

  @Get('search')
  search(
    @Query() paginationDto: PaginationDto,
    @Body() condition: UpdateUserDto,
  ) {
    paginationDto.page = Number(paginationDto.page) || 1;
    paginationDto.limit = Number(paginationDto.limit) || 5;

    return this.userService.search(
      { ...condition },
      {
        ...paginationDto,
        limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
      },
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
