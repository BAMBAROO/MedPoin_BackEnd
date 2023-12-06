import { Module } from '@nestjs/common';
import { AnamnesisController } from './anamnesis.controller';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisHelperModule } from '../helper/anamnesisHelper.module';
import { AbilityModule } from '../ability/ability.module';

@Module({
  controllers: [AnamnesisController],
  providers: [AnamnesisService],
  imports: [AnamnesisHelperModule, AbilityModule],
})
export class AnamnesisModule {}
