import { HttpStatus, Injectable } from '@nestjs/common';
import { RekamMedisDto } from './dto';
import { Response } from 'express';
import RekamMedisHelperService from '../helper/rekamMedisHelper.service';

@Injectable()
export class Rekam_medisService {
  constructor(private rekamMedisHelperService: RekamMedisHelperService) {}

  addPasien(dto: RekamMedisDto, res: Response) {
    return res.send(this.rekamMedisHelperService.addRekamMedis(dto));
  }

  /** experiment **/
  master(res: Response) {
    return res.status(HttpStatus.OK).json({ noRekamMedis: 12 });
  }
}
