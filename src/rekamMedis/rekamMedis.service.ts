import { HttpStatus, Injectable } from '@nestjs/common';
import { RekamMedisDto } from './dto';
import { Response } from 'express';
import RekamMedisHelperService from '../helper/rekamMedisHelperService.service';

@Injectable()
export class RekamMedisService {
  constructor(private rekamMedisHelperService: RekamMedisHelperService) {}

  async addRekamMedis(dto: RekamMedisDto, res: Response) {
    try {
      const data = await this.rekamMedisHelperService.addRekamMedis(dto);
      return res.status(HttpStatus.OK).json({ data });
    } catch (e) {
      throw e;
    }
  }
}
