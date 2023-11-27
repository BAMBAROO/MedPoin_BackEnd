import { IsNotEmpty, IsString } from 'class-validator';

export class RawatDto {
  @IsString()
  @IsNotEmpty()
  no_rm: string;

  @IsString()
  @IsNotEmpty()
  nama_pasien: string;

  @IsString()
  @IsNotEmpty()
  dokter: string;
}

export default RawatDto;
