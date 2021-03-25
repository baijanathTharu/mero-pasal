import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  searchUsers(searchUserDto: SearchUserDto) {
    return this.userRepository.searchUsers(searchUserDto);
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
