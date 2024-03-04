import { IsNotEmpty, IsString } from 'class-validator';

export class RekamMedisDto {
  @IsString()
  @IsNotEmpty()
  no_rm: string;

  @IsString()
  @IsNotEmpty()
  no_rawat: string;
}

export default RekamMedisDto;
