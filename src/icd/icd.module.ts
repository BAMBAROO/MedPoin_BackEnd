import { Module } from '@nestjs/common';
import { IcdController } from './icd.controller';
import { IcdService } from './icd.service';
import { AbilityModule } from '../ability/ability.module';
import { IcdHelperModule } from '../helper/icdHelper.module';

@Module({
  controllers: [IcdController],
  providers: [IcdService],
  imports: [IcdHelperModule, AbilityModule],
})
export class IcdModule {}
