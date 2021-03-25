import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/app/user/dto/create-user.dto';
import { UserRepository } from 'src/app/user/user.repository';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }
}
