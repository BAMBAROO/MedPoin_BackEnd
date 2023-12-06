import { HttpStatus, Injectable } from '@nestjs/common';
import { PasienDto } from './dto';
import { Response } from 'express';
import PasienHelperService from '../helper/pasienHelper.service';

@Injectable()
export class PasienService {
  constructor(private pasienHelperService: PasienHelperService) {}

  async addPasien(dto: PasienDto, res: Response) {
    try {
      const data = await this.pasienHelperService.addPasien(dto);
      return res.status(HttpStatus.OK).json({ data });
    } catch (e) {
      throw e;
    }
  }

  async getRm(res: Response) {
    const data = await this.pasienHelperService.rm();
    return res.status(HttpStatus.OK).json({ data });
  }
}
