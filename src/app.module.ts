import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './Application/authentication/auth.module';
import { PasienModule } from './Application/pasien/pasien.module';
import { PrismaModule } from './Infrastructure/Database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VerifyToken } from './Application/Middleware/verifyToken';
import { DashboardModule } from './Application/dashboard/dashboard.module';
import { RawatModule } from './Application/rawat/rawat.module';
import { AnamnesisModule } from './Application/anamnesis/anamnesis.module';
import { PemeriksaanModule } from './Application/pemeriksaan/pemeriksaan.module';
import { RekamMedisModule } from './Application/rekamMedis/rekamMedis.module';
import { IcdModule } from './Application/icd/icd.module';

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
    IcdModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(VerifyToken)
      .forRoutes(
        { path: '/registrasi', method: RequestMethod.GET },
        { path: '/dashboard', method: RequestMethod.GET },
        { path: '/pasien/rm', method: RequestMethod.GET },
        { path: '/pasien', method: RequestMethod.GET },
        { path: '/dashboard/dokter', method: RequestMethod.GET },
        { path: '/dashboard/users', method: RequestMethod.GET },
        { path: '/dashboard/staf', method: RequestMethod.GET },
        { path: '/dashboard/perawat', method: RequestMethod.GET },
        { path: '/rekammedis/detail', method: RequestMethod.GET },
        { path: '/icd10', method: RequestMethod.GET },
        { path: '/icd9', method: RequestMethod.GET },
        { path: '/rekammedis', method: RequestMethod.GET },
        { path: '/anamnesis', method: RequestMethod.GET },
        { path: '/pasien/registrasi', method: RequestMethod.POST },
        { path: '/signup', method: RequestMethod.POST },
        { path: '/signup/dokter', method: RequestMethod.POST },
        { path: '/signup/perawat', method: RequestMethod.POST },
        { path: '/signup/staf', method: RequestMethod.POST },
        { path: '/rawat', method: RequestMethod.POST },
        { path: '/pemeriksaan', method: RequestMethod.POST },
        { path: '/anamnesis', method: RequestMethod.POST },
      );
  }
}
