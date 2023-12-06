import { IsNotEmpty, IsString } from 'class-validator';

export class AnamnesisDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsString()
  @IsNotEmpty()
  no_rm: string;

  @IsString()
  @IsNotEmpty()
  no_rawat: string;

  @IsString()
  @IsNotEmpty()
  dokter_id: string;

  @IsString()
  @IsNotEmpty()
  perawat_id: string;

  @IsString()
  @IsNotEmpty()
  berat: string;

  @IsString()
  @IsNotEmpty()
  tinggi: string;

  @IsString()
  @IsNotEmpty()
  tensi: string;

  @IsString()
  @IsNotEmpty()
  saturasi: string;

  @IsString()
  @IsNotEmpty()
  suhu: string;
}

export default AnamnesisDto;
