import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './role.guard';
import { AbilityModule } from '../ability/ability.module';
import { AuthHelperModule } from '../helper/authHelper.module';

@Module({
  // imports: [PrismaModule],  this still works because in prisma module we use @Gblobal()
  controllers: [AuthController], // controller path
  providers: [AuthService, { provide: APP_GUARD, useClass: RolesGuard }], // service
  imports: [
    JwtModule.register({
      global: true,
    }),
    AbilityModule,
    AuthHelperModule,
  ],
})
export class AuthModule {}
