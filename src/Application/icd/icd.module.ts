import { Module } from '@nestjs/common';
import { IcdController } from './icd.controller';
import { IcdService } from './icd.service';
import { AbilityModule } from '../../Domain/Ability/ability.module';
import { IcdHelperModule } from '../../Infrastructure/Repositories/icd/icdHelper.module';

@Module({
  controllers: [IcdController],
  providers: [IcdService],
  imports: [IcdHelperModule, AbilityModule],
})
export class IcdModule {}
