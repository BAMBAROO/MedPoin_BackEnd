import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnamnesisDto } from './dto';
import { AnamnesisService } from './anamnesis.service';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../ability/ability.factory';
import { Anamnesis } from '../ability/entities/rules.entitiy';

@Controller('anamnesis')
export class AnamnesisController {
  constructor(
    private anamnesisService: AnamnesisService,
    private abilityFactory: AbilityFactory,
  ) {}

  /** allow for role -> ADMIN and SUPERADMIN **/
  @Post()
  anamnesisPost(
    @Body() dto: AnamnesisDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Create, Anamnesis);
      return this.anamnesisService.addAnamnesis(dto, req, res);
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
  anamnesisGet(
    @Query('no_rawat') no_rawat: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const ability = this.abilityFactory.defineAbility(req['user']);
    try {
      ForbiddenError.from(ability).throwUnlessCan(Actions.Read, 'all');
      return this.anamnesisService.getAnamnesis(no_rawat, req, res);
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
