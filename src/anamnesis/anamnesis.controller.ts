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
import { AnamnesisDto } from './dto';
import { AnamnesisService } from './anamnesis.service';
import { ForbiddenError } from '@casl/ability';
import { AbilityFactory, Actions } from '../ability/ability.factory';
import { Staf } from '../ability/entities/rules.entitiy';

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
      ForbiddenError.from(ability).throwUnlessCan(Actions.Create, 'all');
      return this.anamnesisService.addAnamnesis(dto, res);
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
