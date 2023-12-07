import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PasienModule } from './pasien/pasien.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VerifyToken } from './middleware/verifyToken';
import { DashboardModule } from './dashboard/dashboard.module';
import { RawatModule } from './rawat/rawat.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';
import { PemeriksaanModule } from './pemeriksaan/pemeriksaan.module';
import { RekamMedisModule } from './rekamMedis/rekamMedis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PasienModule,
    DashboardModule,
    RawatModule,
    AnamnesisModule,
    PemeriksaanModule,
    PrismaModule,
    RekamMedisModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(VerifyToken).forRoutes(
      /** on development **/
      { path: '/registrasi', method: RequestMethod.POST },
      { path: '/registrasi', method: RequestMethod.GET },
      { path: '/', method: RequestMethod.GET },
      { path: '/pasien/rm', method: RequestMethod.GET },
      { path: '/pasien', method: RequestMethod.GET },
      { path: '/dokter', method: RequestMethod.GET },
      { path: '/staf', method: RequestMethod.GET },
      { path: '/perawat', method: RequestMethod.GET },
      { path: '/signup', method: RequestMethod.POST },
      { path: '/signup/dokter', method: RequestMethod.POST },
      { path: '/signup/perawat', method: RequestMethod.POST },
      { path: '/signup/staf', method: RequestMethod.POST },
      { path: '/rawat', method: RequestMethod.POST },
      { path: '/pemeriksaan', method: RequestMethod.POST },
      { path: '/anamnesis', method: RequestMethod.POST },
      { path: '/rekammedis', method: RequestMethod.POST },
    );
  }
}
