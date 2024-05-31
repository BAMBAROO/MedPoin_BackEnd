import { Module } from '@nestjs/common';
import { PemeriksaanController } from './pemeriksaan.controller';
import { PemeriksaanService } from './pemeriksaan.service';
import { PemeriksaanHelperModule } from '../../Infrastructure/Repositories/pemeriksaan/pemeriksaanHelper.module';
import { AbilityModule } from '../../Domain/Ability/ability.module';

@Module({
  controllers: [PemeriksaanController],
  providers: [PemeriksaanService],
  imports: [PemeriksaanHelperModule, AbilityModule],
})
export class PemeriksaanModule {}
