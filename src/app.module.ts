import {
  MiddlewareConsumer,
  Module,
  NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PasienModule } from './pasien/pasien.module';
// import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VerifyToken } from './middleware/verifyToken';
// import { RoleMiddleware } from './middleware/RoleMiddleware';
import { DashboardModule } from './dashboard/dashboard.module';
import { RawatModule } from './rawat/rawat.module';
import { AnamnesisModule } from './anamnesis/anamnesis.module';

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
    // PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(VerifyToken)
      .forRoutes
      /** on development **/
      // { path: 'registrasi', method: RequestMethod.POST },
      // { path: 'users', method: RequestMethod.GET },
      // { path: 'role', method: RequestMethod.POST },
      // { path: 'role', method: RequestMethod.DELETE },
      // { path: 'role', method: RequestMethod.PATCH },
      ();

    /** on development **/
    // consumer.apply(RoleMiddleware).forRoutes(
    //   {
    //     path: 'role',
    //     method: RequestMethod.POST,
    //   },
    //   {
    //     path: 'role',
    //     method: RequestMethod.GET,
    //   },
    // );
  }
}
