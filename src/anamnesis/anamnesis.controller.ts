import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AnamnesisDto } from './dto';
import { AnamnesisService } from './anamnesis.service';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(private anamnesisService: AnamnesisService) {}

  /** allow for role -> ADMIN and SUPERADMIN **/
  @Post()
  anamnesisPost(@Body() dto: AnamnesisDto, @Res() res: Response) {
    this.anamnesisService.addAnamnesis(dto, res);
  }
}
