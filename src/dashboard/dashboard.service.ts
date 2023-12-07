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

  async getDataDashboard(res: Response) {
    /** on development **/
    try {
      const data = await this.dashboardHelper.dashboard();
      return res.status(HttpStatus.OK).json({ data });
    } catch (e) {
      throw e;
    }
  }

  async getDokter(res: Response) {
    try {
      const dokter = await this.dashboardHelper.dokter();
      return res.status(HttpStatus.OK).json({ dokter });
    } catch (e) {
      throw e;
    }
  }

  async getPerawat(res: Response) {
    try {
      const perawat = await this.dashboardHelper.perawat();
      return res.status(HttpStatus.OK).json({ perawat });
    } catch (e) {
      throw e;
    }
  }

  async getStaf(res: Response) {
    try {
      const staf = await this.dashboardHelper.staf();
      return res.status(HttpStatus.OK).json({ staf });
    } catch (e) {
      throw e;
    }
  }
}
