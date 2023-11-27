import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardHelperModule } from '../helper/dashboardHelper.module';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
  imports: [DashboardHelperModule],
})
export class DashboardModule {}
