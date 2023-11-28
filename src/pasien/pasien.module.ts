import { Module } from '@nestjs/common';
import { PasienService } from "./pasien.service";
import { PasienController } from './pasien.controller';
import { PasienHelperModule } from '../helper/pasienHelper.module';

@Module({
  controllers: [PasienController],
  providers: [PasienService],
  imports: [PasienHelperModule],
})
export class PasienModule {}
