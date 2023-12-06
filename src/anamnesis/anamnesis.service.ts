import { HttpStatus, Injectable } from '@nestjs/common';
import { AnamnesisDto } from './dto';
import { Response } from 'express';
import AnamnesisHelperService from '../helper/anamnesisHelper.service';

@Injectable()
export class AnamnesisService {
  constructor(private anamnesisHelperService: AnamnesisHelperService) {}

  async addAnamnesis(dto: AnamnesisDto, res: Response) {
    /** must using try and catch **/
    try {
      const data = await this.anamnesisHelperService.addAnamnesis(dto);
      return res.status(HttpStatus.CREATED).json({ data });
    } catch (e) {
      throw e;
    }
  }
}
