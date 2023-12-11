import { HttpStatus, Injectable } from '@nestjs/common';
import { AnamnesisDto } from './dto';
import { Request, Response } from 'express';
import AnamnesisHelperService from '../helper/anamnesisHelper.service';

@Injectable()
export class AnamnesisService {
  constructor(private anamnesisHelperService: AnamnesisHelperService) {}

  async addAnamnesis(dto: AnamnesisDto, req: Request, res: Response) {
    /** must using try and catch **/
    try {
      const data = await this.anamnesisHelperService.addAnamnesis(dto);
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async getAnamnesis(no_rawat: string, req: Request, res: Response) {
    try {
      const data = await this.anamnesisHelperService.getAnamnesis(no_rawat);
      if (!data) {
        return res.sendStatus(HttpStatus.NO_CONTENT);
      }
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }
}
