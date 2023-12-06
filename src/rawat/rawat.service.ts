import { HttpStatus, Injectable } from '@nestjs/common';
import { RawatDto } from './dto';
import { Response } from 'express';
import RawatHelperService from '../helper/rawatHelper.service';

@Injectable()
export class RawatService {
  constructor(private rawatHelperService: RawatHelperService) {}

  async registrasiRawat(dto: RawatDto, res: Response) {
    try {
      const data = await this.rawatHelperService.addRawat(dto);
      return res.status(HttpStatus.OK).json({ data });
    } catch (e) {
      throw e;
    }
  }
}
