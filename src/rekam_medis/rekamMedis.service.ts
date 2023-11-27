import { HttpStatus, Injectable } from '@nestjs/common';
import { RekamMedisDto } from './dto';
import { Response } from 'express';
import RekamMedisHelperService from '../helper/rekamMedisHelper.service';

@Injectable()
export class Rekam_medisService {
  constructor(private rekamMedisHelperService: RekamMedisHelperService) {}

  addPasien(dto: RekamMedisDto, res: Response) {
    /** must using try and catch **/
    return res.send(this.rekamMedisHelperService.addRekamMedis(dto));
  }
}
