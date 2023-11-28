import { Controller, Get, Res } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Response } from 'express';

@Controller('')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  /** allow for role -> all role **/
  @Get()
  dashboard(@Res() res: Response) {
    return this.dashboardService.getDataDashboard(res);
  }

  @Get('/dokter')
  dokter(@Res() res: Response) {
    return this.dashboardService.getDokter(res);
  }

  @Get('/perawat')
  perawat(@Res() res: Response) {
    return this.dashboardService.getDokter(res);
  }
}
