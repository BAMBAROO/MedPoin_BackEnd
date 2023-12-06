import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/user.enum';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDokterDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  spesialis: string;
}

export class SignUpPerawatDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNotEmpty()
  nama: string;
}

export class SignUpStafDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNotEmpty()
  nama: string;
}
