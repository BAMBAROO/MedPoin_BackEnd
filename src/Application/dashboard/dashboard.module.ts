import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardHelperModule } from '../../Infrastructure/Repositories/dashboard/dashboardHelper.module';
import { AbilityModule } from '../../Domain/Ability/ability.module';

@Module({
  providers: [DashboardService],
  controllers: [DashboardController],
  imports: [DashboardHelperModule, AbilityModule],
})
export class DashboardModule {}
