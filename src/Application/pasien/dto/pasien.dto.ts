import { IsNotEmpty, IsString } from 'class-validator';

export class PasienDto {
  @IsNotEmpty()
  @IsString()
  no_rm: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  no_ktp: string;

  @IsNotEmpty()
  @IsString()
  no_bpjs: string;

  @IsNotEmpty()
  @IsString()
  tempat_lahir: string;

  @IsNotEmpty()
  @IsString()
  tanggal_lahir: string;

  @IsNotEmpty()
  @IsString()
  jenis_kelamin: string;

  @IsNotEmpty()
  @IsString()
  gol_darah: string;

  @IsNotEmpty()
  @IsString()
  no_hp: string;

  @IsNotEmpty()
  @IsString()
  nama_keluarga: string;

  @IsNotEmpty()
  @IsString()
  no_hp_keluarga: string;

  @IsNotEmpty()
  @IsString()
  alamat_lengkap: string;

  @IsNotEmpty()
  @IsString()
  status_perkawinan: string;
}

export default PasienDto;
