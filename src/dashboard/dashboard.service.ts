import { HttpStatus, Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import DashboardHelperService from '../helper/dashboardHelper.service';

@Injectable()
export class DashboardService {
  constructor(
    // private prismaService: PrismaService,
    private dashboardHelper: DashboardHelperService,
  ) {}

  getDataDashboard(res: Response) {
    /** on development **/
    try {
      const dataDashboard = this.dashboardHelper.dashboard();
      return res.status(HttpStatus.OK).json(dataDashboard);
    } catch (e) {
      throw e;
    }
  }

  getDokter(res: Response) {
    try {
      const listDokter = this.dashboardHelper.dokter();
      return res.status(HttpStatus.OK).json(listDokter);
    } catch (e) {
      throw e;
    }
  }

  getPerawat(res: Response) {
    try {
      const listPerawat = this.dashboardHelper.perawat();
      return res.status(HttpStatus.OK).json(listPerawat);
    } catch (e) {
      throw e;
    }
  }
}
