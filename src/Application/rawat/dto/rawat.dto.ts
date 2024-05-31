import { IsNotEmpty, IsString } from 'class-validator';

export class RawatDto {
  @IsString()
  @IsNotEmpty()
  no_rm: string;

  @IsString()
  @IsNotEmpty()
  dokter_id: string;
}

export default RawatDto;
