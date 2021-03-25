import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  first_name: string;

  @IsNotEmpty()
  @IsAlpha()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  service_id: string;
}
