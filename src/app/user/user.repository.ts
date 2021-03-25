import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const query = this.createQueryBuilder();

    const users = await query.getMany();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }

    return user;
  }

  async searchUsers(searchUserDto: SearchUserDto): Promise<User[]> {
    const { search } = searchUserDto;
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('user.username LIKE :search', { search: `%${search}%` });
    }

    const users = await query.getMany();
    return users;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { username, password } = updateUserDto;

    const user = await this.getUserById(id);

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }

    await user.save();
    return user;
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const deleted = await this.delete({ id });
    if (!deleted.affected) {
      throw new BadRequestException(`User with id '${id}' not available`);
    }
    return deleted;
  }
}
