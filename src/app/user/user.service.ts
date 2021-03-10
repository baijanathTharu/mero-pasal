import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      let newUser = new User();
      newUser = { ...createUserDto };
      const savedUser = await this.userRepo.save(newUser);
      return { data: savedUser, message: 'success' };
    } catch (error) {
      return { error };
    }
  }

  findAll(condition, paginationDto) {
    return this.search(condition, paginationDto);
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepo.findOne(id);
      if (!user) return { data: {}, message: 'No user exist with this id' };
      return { data: user, message: 'success' };
    } catch (error) {
      return { error };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let userToUpdate = await this.userRepo.findOne(id);
      userToUpdate = { ...userToUpdate, ...updateUserDto };
      const updatedUser = await this.userRepo.save(userToUpdate);
      return { data: updatedUser, message: 'success' };
    } catch (error) {
      return { error };
    }
  }

  async remove(id: number) {
    try {
      const userToRemove = await this.userRepo.findOne(id);
      const removedUser = await this.userRepo.remove(userToRemove);
      return { data: removedUser, message: 'success' };
    } catch (error) {
      return { error };
    }
  }

  async search(condition: any, paginationDto: PaginationDto) {
    try {
      const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

      const totalCount = await this.userRepo.count();

      const items = await this.userRepo.find({
        where: { ...condition },
        order: {
          id: 'DESC',
        },
        skip: skippedItems,
        take: paginationDto.limit,
      });

      return {
        totalCount,
        page: paginationDto.page,
        limit: paginationDto.limit,
        data: items,
        message: 'success',
      };
    } catch (error) {
      return { error };
    }
  }
}
