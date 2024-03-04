import { Global, Module } from '@nestjs/common';
import PasienHelperService from './pasienHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [PasienHelperService],
  exports: [PasienHelperService],
})
export class PasienHelperModule {}
