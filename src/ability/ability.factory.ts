import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/user.enum';
import { Dokter, Perawat, Staf } from './entities/rules.entitiy';

export const enum Actions {
  Manage = 'manage' /** wildcard **/,
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// const adminRole: Role[] = [Role.ADMIN, Role.STAF];

export type Subject =
  | InferSubjects<
      typeof UserEntity | typeof Dokter | typeof Perawat | typeof Staf
    >
  | 'all';
type AppAbility = MongoAbility<[Actions, Subject]>;

@Injectable()
export class AbilityFactory {
  defineAbility = (user: UserEntity) => {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    if (user.role === Role.ADMIN) {
      can(Actions.Manage, 'all');
    } else if (user.role === Role.STAF) {
      can(Actions.Read, 'all');
      can(Actions.Create, 'all');
      cannot(Actions.Create, Dokter).because("Your're not allowed");
      cannot(Actions.Create, Perawat).because("Your're not allowed");
      cannot(Actions.Create, Staf).because("Your're not allowed");
      cannot(Actions.Create, UserEntity).because("Your're not allowed");
    } else {
      can(Actions.Read, 'all');
      cannot(Actions.Delete, 'all').because("Your're not allowed");
      cannot(Actions.Create, 'all').because("Your're not allowed");
      cannot(Actions.Update, 'all').because("Your're not allowed");
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  };
}
