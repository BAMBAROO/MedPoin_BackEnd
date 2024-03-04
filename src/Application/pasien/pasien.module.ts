import { Module } from '@nestjs/common';
import { PasienService } from './pasien.service';
import { PasienController } from './pasien.controller';
import { PasienHelperModule } from '../../Infrastructure/Repositories/pasien/pasienHelper.module';
import { AbilityModule } from '../../Domain/Ability/ability.module';

@Module({
  controllers: [PasienController],
  providers: [PasienService],
  imports: [PasienHelperModule, AbilityModule],
})
export class PasienModule {}
