import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { Rekam_medisModule } from './rekam_medis/rekam_medis.module';
// import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { VerifyToken } from './middleware/verifyToken';
// import { RoleMiddleware } from './middleware/RoleMiddleware';
import { DashboardModule } from './dashboard/dashboard.module';
import { RawatModule } from './rawat/rawat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    Rekam_medisModule,
    DashboardModule,
    RawatModule,
    // PrismaModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(VerifyToken).forRoutes(
      { path: 'registrasi', method: RequestMethod.POST },

      /** on development **/
      // { path: 'users', method: RequestMethod.GET },
      // { path: 'role', method: RequestMethod.POST },
      // { path: 'role', method: RequestMethod.DELETE },
      // { path: 'role', method: RequestMethod.PATCH },
    );

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
