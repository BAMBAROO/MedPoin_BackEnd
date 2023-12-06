import { Module } from '@nestjs/common';
import { RawatController } from './rawat.controller';
import { RawatService } from './rawat.service';
import { RawatHelperModule } from '../helper/rawatHelper.module';
import { AbilityModule } from '../ability/ability.module';

@Module({
  controllers: [RawatController],
  providers: [RawatService],
  imports: [RawatHelperModule, AbilityModule],
})
export class RawatModule {}
