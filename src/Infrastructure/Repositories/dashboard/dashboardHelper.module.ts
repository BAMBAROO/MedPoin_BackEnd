import { Global, Module } from '@nestjs/common';
import DashboardHelperService from './dashboardHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [DashboardHelperService],
  exports: [DashboardHelperService],
})
export class DashboardHelperModule {}
