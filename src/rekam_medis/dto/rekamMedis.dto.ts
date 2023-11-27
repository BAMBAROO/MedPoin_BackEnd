import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RekamMedisDto {
  @IsNotEmpty()
  @IsString()
  no_rm: string;

  @IsNotEmpty()
  @IsNumber()
  no_ktp: number;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  alamat_lengkap: string;

  @IsNotEmpty()
  @IsString()
  jenis_kelamin: string;

  @IsNotEmpty()
  @IsString()
  status_perkawinan: string;

  @IsNotEmpty()
  @IsString()
  nomor_hp: string;

  @IsNotEmpty()
  @IsString()
  golongan_darah: string;

  @IsNotEmpty()
  @IsString()
  nama_keluarga: string;

  @IsNotEmpty()
  @IsString()
  nomor_hp_keluarga: string;
}

export default RekamMedisDto;
