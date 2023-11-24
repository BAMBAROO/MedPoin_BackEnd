import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RekamMedisDto {
  @IsNotEmpty()
  @IsString()
  no_rm: string;

  @IsNumber()
  no_ktp: number;

  @IsOptional()
  @IsNumber()
  no_asuransi: number;

  @IsNotEmpty()
  @IsString()
  nama_lengkap: string;

  @IsNotEmpty()
  @IsString()
  tempat_lahir: string;

  @IsNotEmpty()
  @IsString()
  tanggal_lahir: string;

  @IsString()
  alamat_lengkap: string;

  @IsString()
  jenis_kelamin: string;

  @IsString()
  status_perkawinan: string;

  @IsString()
  nomor_hp: string;

  @IsString()
  golongan_darah: string;

  @IsString()
  nama_keluarga: string;

  @IsString()
  nomor_hp_keluarga: string;
}

export default RekamMedisDto;
