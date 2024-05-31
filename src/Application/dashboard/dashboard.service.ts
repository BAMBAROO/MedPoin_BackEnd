import { HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import DashboardHelperService from '../../Infrastructure/Repositories/dashboard/dashboardHelper.service';

@Injectable()
export class DashboardService {
  constructor(private dashboardHelper: DashboardHelperService) {}

  async getDataDashboard(req: Request, res: Response) {
    try {
      const rawData = await this.dashboardHelper.dashboard();

      const data = (rawData: any) => {
        const result = rawData?.map((data: any) => {
          const date = data?.tgl_antrian;
          const dateExtract = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
          const dateNow = new Date();
          const today = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;
          if (dateExtract === today) {
            return data;
          }
        });
        return result.filter((data: any): boolean => data !== undefined);
      };

      if (data?.length === 0) {
        return res.sendStatus(HttpStatus.NO_CONTENT);
      }
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

  async getDokter(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.dokter();
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

  async getPerawat(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.perawat();
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

  async getStaf(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.staf();
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

  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.dashboardHelper.users();
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
}
