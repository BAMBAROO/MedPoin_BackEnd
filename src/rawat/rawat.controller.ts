import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RawatDto } from './dto';
import { RawatService } from './rawat.service';

@Controller('rawat')
export class RawatController {
  constructor(private rawatService: RawatService) {}

  /** allow for role -> ADMIN and SUPERADMIN **/
  @Post()
  registrasiRawat(@Body() dto: RawatDto, @Res() res: Response) {
    this.rawatService.registrasiRawat(dto, res);
  }

  /** allow for role -> all role **/
  @Get()
  listPatientDoctor(@Res() res: Response) {
    this.rawatService.getPatientDoctor(res);
  }
}
