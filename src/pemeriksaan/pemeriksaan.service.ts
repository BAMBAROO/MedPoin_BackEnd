import { HttpStatus, Injectable } from '@nestjs/common';
import { PemeriksaanDto } from './dto';
import { Response } from 'express';
import PemeriksaanHelperService from '../helper/pemeriksaanHelper.service';

@Injectable()
export class PemeriksaanService {
  constructor(private pemeriksaanHelper: PemeriksaanHelperService) {}

  async pemeriksaanDokter(dto: PemeriksaanDto, res: Response) {
    try {
      const data = await this.pemeriksaanHelper.pemeriksaan(dto);
      return res.status(HttpStatus.CREATED).json({ data });
    } catch (e) {
      throw e;
    }
  }
}
