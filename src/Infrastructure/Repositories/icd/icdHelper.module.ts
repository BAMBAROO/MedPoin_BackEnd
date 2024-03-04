import { Global, Module } from '@nestjs/common';
import icdHelperService from './icdHelper.service';

@Global() // it helps for not doing import in every module just import directly in their service or controller file to the AuthHelperService
@Module({
  providers: [icdHelperService],
  exports: [icdHelperService],
})
export class IcdHelperModule {}
