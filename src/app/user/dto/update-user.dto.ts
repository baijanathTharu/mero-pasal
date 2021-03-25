import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
