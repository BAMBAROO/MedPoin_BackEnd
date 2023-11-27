import { HttpStatus, Injectable } from "@nestjs/common";
import { RawatDto } from './dto';
import { Response } from 'express';
import RawatHelperService from '../helper/rawatHelper.service';

@Injectable()
export class RawatService {
  constructor(private rawatHelperService: RawatHelperService) {}

  getPatientDoctor(res: Response) {
    /** must using try and catch **/
    return res.send(this.rawatHelperService.listPatientDoctor());
  }

  registrasiRawat(dto: RawatDto, res: Response) {
    /** must using try and catch **/
    return res.status(HttpStatus.CREATED).json(this.rawatHelperService.addRawat(dto));
  }
}
