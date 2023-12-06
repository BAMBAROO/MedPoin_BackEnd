import { Module } from '@nestjs/common';
import { RekamMedisController } from './rekamMedis.controller';
import { RekamMedisService } from './rekamMedis.service';
import { AbilityModule } from '../ability/ability.module';
import { RekamMedisHelperModule } from '../helper/rekamMedisHelperService.module';

@Module({
  controllers: [RekamMedisController],
  providers: [RekamMedisService],
  imports: [RekamMedisHelperModule, AbilityModule],
})
export class RekamMedisModule {}
