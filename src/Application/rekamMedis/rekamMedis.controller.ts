import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RekamMedisService } from './rekamMedis.service';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../../Domain/Ability/ability.factory';
import { RekamMedis } from '../../Domain/Ability/entities/rules.entitiy';

@Controller('rekammedis')
export class RekamMedisController {
  constructor(
    private rekamMedisService: RekamMedisService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow for role -> ADMIN and SUPERADMIN **/

  @Get()
  rekamMedis(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, RekamMedis);
      return this.rekamMedisService.getRekamMedis(req, res);
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

  @Get('detail')
  rekamMedisDetail(
    @Query('no_rm') no_rm: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, RekamMedis);
      return this.rekamMedisService.getRekamMedisDetail(req, res, {
        no_rm,
      });
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
