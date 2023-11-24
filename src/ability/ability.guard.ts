import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { CHECKABILITY, RequiredRules } from './ablity.decorator';
import { Observable } from 'rxjs';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rulesFromRequest = this.reflector.getAllAndOverride<RequiredRules[]>(
      CHECKABILITY,
      [context.getHandler()],
    );
    const user = context.switchToHttp().getRequest().user;
    try {
      const ability = this.caslAbilityFactory.defineAbility(user);
      rulesFromRequest.forEach((rule) => {
        return ForbiddenError.from(ability).throwUnlessCan(
          rule.action,
          rule.subject,
        );
      });
      return true;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
