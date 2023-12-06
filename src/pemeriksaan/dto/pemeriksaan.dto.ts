import { IsNotEmpty, IsString } from 'class-validator';

export class PemeriksaanDto {
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
  keluhan: string;

  @IsString()
  @IsNotEmpty()
  tindakan: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  resep_obat: string;
}

export default PemeriksaanDto;
