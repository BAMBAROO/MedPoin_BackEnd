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
    return res.status(HttpStatus.OK).json(this.dashboardHelper.dashboard());
  }
}
