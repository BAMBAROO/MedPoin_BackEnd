import { Module } from '@nestjs/common';
import { RawatController } from './rawat.controller';
import { RawatService } from './rawat.service';
import { RawatHelperModule } from '../../Infrastructure/Repositories/rawat/rawatHelper.module';
import { AbilityModule } from '../../Domain/Ability/ability.module';

@Module({
  controllers: [RawatController],
  providers: [RawatService],
  imports: [RawatHelperModule, AbilityModule],
})
export class RawatModule {}
