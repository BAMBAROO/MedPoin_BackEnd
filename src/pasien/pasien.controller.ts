import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PasienService } from './pasien.service';
import { PasienDto } from './dto';
import { Request, Response } from 'express';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../ability/ability.factory';
import { Pasien } from '../ability/entities/rules.entitiy';

@Controller('pasien')
export class PasienController {
  constructor(
    private pasienService: PasienService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow role -> staf and admin **/
  @Post('registrasi')
  registrasiPasien(
    @Body() dto: PasienDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Create, Pasien);
      return this.pasienService.addPasien(dto, req, res);
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

  @Get()
  all(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, Pasien);
      return this.pasienService.all(req, res);
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

  @Get('rm')
  lastRm(@Req() req: Request, @Res() res: Response) {
    console.log(req['user']);
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.pasienService.getRm(req, res);
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
