import { SetMetadata } from '@nestjs/common';
import { Role } from './entities/user.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
