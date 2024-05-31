import { HttpStatus, Injectable } from '@nestjs/common';
import { RawatDto } from './dto';
import { Request, Response } from 'express';
import RawatHelperService from '../../Infrastructure/Repositories/rawat/rawatHelper.service';

@Injectable()
export class RawatService {
  constructor(private rawatHelperService: RawatHelperService) {}

  async registrasiRawat(dto: RawatDto, req: Request, res: Response) {
    try {
      const data = await this.rawatHelperService.addRawat(dto);
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
