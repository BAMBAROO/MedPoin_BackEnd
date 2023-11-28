import { HttpStatus, Injectable } from '@nestjs/common';
import { AnamnesisDto } from './dto';
import { Response } from 'express';
import RawatHelperService from '../helper/rawatHelper.service';
import AnamnesisHelperService from '../helper/anamnesisHelper.service';

@Injectable()
export class AnamnesisService {
  constructor(private anamnesisHelperService: AnamnesisHelperService) {}

  addAnamnesis(dto: AnamnesisDto, res: Response) {
    /** must using try and catch **/
    try {
      return res
        .status(HttpStatus.CREATED)
        .json(this.anamnesisHelperService.saveAnamnesis(dto));
    } catch (e) {
      throw e;
    }
  }
}
