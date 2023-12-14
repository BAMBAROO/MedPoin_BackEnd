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
import { Request, Response } from 'express';
import { RawatDto } from './dto';
import { RawatService } from './rawat.service';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../ability/ability.factory';
import { Rawat, Staf } from '../ability/entities/rules.entitiy';

@Controller('rawat')
export class RawatController {
  constructor(
    private rawatService: RawatService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow for role -> ADMIN and SUPERADMIN **/
  @Post()
  registrasiRawat(
    @Body() dto: RawatDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Create, Rawat);
      return this.rawatService.registrasiRawat(dto, req, res);
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
