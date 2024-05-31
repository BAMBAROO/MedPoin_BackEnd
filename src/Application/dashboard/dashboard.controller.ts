import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../../Domain/Ability/ability.factory';
import { Dashboard } from '../../Domain/Ability/entities/rules.entitiy';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow for role -> all role **/
  @Get()
  dashboard(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, Dashboard);
      return this.dashboardService.getDataDashboard(req, res);
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

  @Get('/dokter')
  dokter(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.dashboardService.getDokter(req, res);
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

  @Get('/users')
  users(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.dashboardService.getUsers(req, res);
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

  @Get('/perawat')
  perawat(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.dashboardService.getPerawat(req, res);
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

  @Get('/staf')
  staf(@Req() req: Request, @Res() res: Response) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.dashboardService.getStaf(req, res);
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
