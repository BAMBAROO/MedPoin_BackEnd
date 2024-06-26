import { Module } from '@nestjs/common';
import { AnamnesisController } from './anamnesis.controller';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisHelperModule } from '../../Infrastructure/Repositories/anamnesis/anamnesisHelper.module';
import { AbilityModule } from '../../Domain/Ability/ability.module';

@Module({
  controllers: [AnamnesisController],
  providers: [AnamnesisService],
  imports: [AnamnesisHelperModule, AbilityModule],
})
export class AnamnesisModule {}
