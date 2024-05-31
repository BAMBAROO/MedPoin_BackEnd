import { SetMetadata } from '@nestjs/common';
import { Actions, Subject } from './ability.factory';

export const CHECKABILITY = 'check_ability';

export interface RequiredRules {
  action: Actions;
  subject: Subject;
}

export const CheckAbilities = (...requirements: RequiredRules[]) =>
  SetMetadata(CHECKABILITY, requirements);
