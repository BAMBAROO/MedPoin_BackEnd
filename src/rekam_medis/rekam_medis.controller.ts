import { Body, Controller, Post, Res } from '@nestjs/common';
import { Rekam_medisService } from './rekamMedis.service';
import { RekamMedisDto } from './dto';
import { Response } from 'express';

@Controller('registrasi')
export class Rekam_medisController {
  constructor(private rekamMedisService: Rekam_medisService) {}

  @Post()
  registrasiRekamMedis(@Res() res: Response, @Body() dto: RekamMedisDto) {
    return this.rekamMedisService.addPasien(dto, res);
  }
}
