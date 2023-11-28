import { Module } from '@nestjs/common';
import { AnamnesisController } from './anamnesis.controller';
import { AnamnesisService } from './anamnesis.service';
import { AnamnesisHelperModule } from '../helper/anamnesisHelper.module';

@Module({
  controllers: [AnamnesisController],
  providers: [AnamnesisService],
  imports: [AnamnesisHelperModule],
})
export class AnamnesisModule {}
