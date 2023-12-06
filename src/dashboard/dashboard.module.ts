import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardHelperModule } from '../helper/dashboardHelper.module';
import { AbilityModule } from '../ability/ability.module';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
  imports: [DashboardHelperModule, AbilityModule],
})
export class DashboardModule {}
