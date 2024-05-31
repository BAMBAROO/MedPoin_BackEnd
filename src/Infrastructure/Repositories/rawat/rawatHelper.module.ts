import { Global, Module } from '@nestjs/common';
import RawatHelperService from './rawatHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [RawatHelperService],
  exports: [RawatHelperService],
})
export class RawatHelperModule {}
