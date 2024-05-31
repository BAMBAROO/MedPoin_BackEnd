import { HttpStatus, Injectable } from '@nestjs/common';
import { PasienDto } from './dto';
import { Request, Response } from 'express';
import PasienHelperService from '../../Infrastructure/Repositories/pasien/pasienHelper.service';

@Injectable()
export class PasienService {
  constructor(private pasienHelperService: PasienHelperService) {}

  async addPasien(dto: PasienDto, req: Request, res: Response) {
    try {
      const data = await this.pasienHelperService.addPasien(dto);
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

  async all(req: Request, res: Response) {
    /** on development **/
    try {
      const data = await this.pasienHelperService.all();
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

  async getRm(req: Request, res: Response) {
    const data = await this.pasienHelperService.rm();
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
  }
}
