import { Body, Controller, Post, Res } from '@nestjs/common';
import { PasienService } from './pasien.service';
import { PasienDto } from './dto';
import { Response } from 'express';

@Controller('registrasi')
export class PasienController {
  constructor(private rekamMedisService: PasienService) {}

  @Post()
  registrasiPasien(@Body() dto: PasienDto, @Res() res: Response) {
    return this.rekamMedisService.addPasien(dto, res);
  }
}
