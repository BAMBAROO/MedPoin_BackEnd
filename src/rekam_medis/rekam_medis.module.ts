import { Module } from '@nestjs/common';
import { Rekam_medisService } from './rekamMedis.service';
import { Rekam_medisController } from './rekam_medis.controller';
import { RekamMedisHelperModule } from '../helper/rekamMedisHelper.module';

@Module({
  controllers: [Rekam_medisController],
  providers: [Rekam_medisService],
  imports: [RekamMedisHelperModule],
})
export class Rekam_medisModule {}
