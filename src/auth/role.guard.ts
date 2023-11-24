import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/user.enum';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // getting what role is required
    const requiredRole = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log(context.switchToHttp().getRequest().rekam_medis);

    // another routes if there is no requirement roles
    if (!requiredRole) {
      return true;
    }

    // we can use validate or authentication for checking rekam_medis's role
    const { user } = context.switchToHttp().getRequest();

    return requiredRole.some((role) => user.role.includes(role)); // return true or false
  }
}
