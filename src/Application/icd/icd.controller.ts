import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IcdService } from './icd.service';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../../Domain/Ability/ability.factory';

@Controller()
export class IcdController {
  constructor(
    private icdService: IcdService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow for role -> ADMIN and SUPERADMIN **/

  @Get('icd9')
  rekamMedis(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.icdService.icd9(req, res);
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

  @Get('icd10')
  rekamMedisDetail(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.icdService.icd10(req, res);
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
