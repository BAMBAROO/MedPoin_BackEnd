import { Global, Module } from '@nestjs/common';
import RekamMedisHelperService from './rekamMedisHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [RekamMedisHelperService],
  exports: [RekamMedisHelperService],
})
export class RekamMedisHelperModule {}
