import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import RekamMedisHelperService from '../helper/rekamMedisHelperService.service';

@Injectable()
export class RekamMedisService {
  constructor(private rekamMedisHelperService: RekamMedisHelperService) {}

  async getRekamMedisDetail(req: Request, res: Response, { no_rm }) {
    try {
      const data = await this.rekamMedisHelperService.rekamMedisDetail({
        no_rm,
      });
      const response = {
        error: false,
        message: 'success',
        data,
      };
      return res.status(HttpStatus.OK).json({
        ...response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async getRekamMedis(req: Request, res: Response) {
    try {
      const data = await this.rekamMedisHelperService.rekamMedis();
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        ...response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }
}
