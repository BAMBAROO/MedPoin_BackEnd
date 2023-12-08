import { HttpStatus, Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';
import DashboardHelperService from '../helper/dashboardHelper.service';

@Injectable()
export class DashboardService {
  constructor(
    // private prismaService: PrismaService,
    private dashboardHelper: DashboardHelperService,
  ) {}

  async getDataDashboard(req: Request, res: Response) {
    /** on development **/
    try {
      const data = await this.dashboardHelper.dashboard();
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async getDokter(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.dokter();
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async getPerawat(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.perawat();
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async getStaf(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.staf();
      const response = {
        error: false,
        message: 'success',
        data: data,
      };
      return res.status(HttpStatus.OK).json({
        response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }
}
