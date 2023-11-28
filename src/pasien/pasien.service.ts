import { HttpStatus, Injectable } from '@nestjs/common';
import { PasienDto } from './dto';
import { Response } from 'express';
import PasienHelperService from '../helper/pasienHelper.service';

@Injectable()
export class PasienService {
  constructor(private rekamMedisHelperService: PasienHelperService) {}

  addPasien(dto: PasienDto, res: Response) {
    /** must using try and catch **/
    return res.send(this.rekamMedisHelperService.addRekamMedis(dto));
  }
}
