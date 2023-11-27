import { Module } from '@nestjs/common';
import { RawatController } from './rawat.controller';
import { RawatService } from './rawat.service';
import { RawatHelperModule } from '../helper/rawatHelper.module';

@Module({
  controllers: [RawatController],
  providers: [RawatService],
  imports: [RawatHelperModule],
})
export class RawatModule {}
