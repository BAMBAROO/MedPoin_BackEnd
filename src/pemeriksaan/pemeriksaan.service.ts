import { HttpStatus, Injectable } from '@nestjs/common';
import { PemeriksaanDto } from './dto';
import { Request, Response } from 'express';
import PemeriksaanHelperService from '../helper/pemeriksaanHelper.service';

@Injectable()
export class PemeriksaanService {
  constructor(private pemeriksaanHelper: PemeriksaanHelperService) {}

  async pemeriksaanDokter(dto: PemeriksaanDto, req: Request, res: Response) {
    try {
      const data = await this.pemeriksaanHelper.pemeriksaan(dto);
      await this.pemeriksaanHelper.addRekamMedis({
        no_rawat: data.no_rawat,
        no_rm: data.no_rm,
      });
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
