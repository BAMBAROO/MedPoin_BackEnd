import { Global, Module } from '@nestjs/common';
import rekamMedisHelperService from './rekamMedisHelperService.service';

@Global()
@Module({
  providers: [rekamMedisHelperService],
  exports: [rekamMedisHelperService],
})
export class RekamMedisHelperModule {}
