import { PartialType } from '@nestjs/mapped-types';
import { IsAlpha, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  @IsOptional()
  last_name: string;
}
