import { Global, Module } from '@nestjs/common';
import PasienHelperService from './pasienHelper.service';
import PemeriksaanHelperService from './pemeriksaanHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [PemeriksaanHelperService],
  exports: [PemeriksaanHelperService],
})
export class PemeriksaanHelperModule {}
