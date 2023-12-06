import { Module } from '@nestjs/common';
import { PemeriksaanController } from './pemeriksaan.controller';
import { PemeriksaanService } from './pemeriksaan.service';
import { PemeriksaanHelperModule } from '../helper/pemeriksaanHelper.module';
import { AbilityModule } from '../ability/ability.module';

@Module({
  controllers: [PemeriksaanController],
  providers: [PemeriksaanService],
  imports: [PemeriksaanHelperModule, AbilityModule],
})
export class PemeriksaanModule {}
