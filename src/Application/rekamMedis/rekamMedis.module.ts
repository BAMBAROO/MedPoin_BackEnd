import { Module } from '@nestjs/common';
import { RekamMedisController } from './rekamMedis.controller';
import { RekamMedisService } from './rekamMedis.service';
import { AbilityModule } from '../../Domain/Ability/ability.module';
import { RekamMedisHelperModule } from '../../Infrastructure/Repositories/rekamMedis/rekamMedisHelperService.module';

@Module({
  controllers: [RekamMedisController],
  providers: [RekamMedisService],
  imports: [RekamMedisHelperModule, AbilityModule],
})
export class RekamMedisModule {}
