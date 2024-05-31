import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import IcdHelperService from '../../Infrastructure/Repositories/icd/icdHelper.service';

@Injectable()
export class IcdService {
  constructor(private icdHelperService: IcdHelperService) {}

  async icd10(req: Request, res: Response) {
    try {
      const data = await this.icdHelperService.icd10();
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

  async icd9(req: Request, res: Response) {
    try {
      const data = await this.icdHelperService.icd9();
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
