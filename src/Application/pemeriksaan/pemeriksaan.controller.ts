import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PemeriksaanDto } from './dto';
import { PemeriksaanService } from './pemeriksaan.service';
import { AbilityFactory, Actions } from '../../Domain/Ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Request, Response } from 'express';
import { Pemeriksaan } from '../../Domain/Ability/entities/rules.entitiy';

@Controller('pemeriksaan')
export class PemeriksaanController {
  constructor(
    private pemeriksaanService: PemeriksaanService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Post()
  pemeriksaanDokter(
    @Body() dto: PemeriksaanDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Create, Pemeriksaan);
      return this.pemeriksaanService.pemeriksaanDokter(dto, req, res);
    } catch (e) {
      if (e instanceof ForbiddenError) {
        throw new HttpException(
          {
            message: e.message,
            error: 'Forbidden',
            status: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }
  }
}
