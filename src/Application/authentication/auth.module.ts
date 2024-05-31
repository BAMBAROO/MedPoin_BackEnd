import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AbilityModule } from '../../Domain/Ability/ability.module';
import { AuthHelperModule } from '../../Infrastructure/Repositories/authentication/authHelper.module';

@Module({
  /** imports: [PrismaModule],  this still works because in prisma module we use @Gblobal() **/
  controllers: [AuthController], // controller path
  providers: [AuthService], // service
  imports: [
    JwtModule.register({
      global: true,
    }),
    AbilityModule,
    AuthHelperModule,
  ],
})
export class AuthModule {}
