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

export const enum Actions {
  Manage = 'manage' /** wildcard **/,
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

const adminRole: Role[] = [Role.ADMIN, Role.SUPERADMIN];

export type Subject = InferSubjects<typeof UserEntity> | 'all';
type AppAbility = MongoAbility<[Actions, Subject]>;

@Injectable()
export class AbilityFactory {
  defineAbility = (user: UserEntity) => {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    if (user.role.some((role) => role === Role.SUPERADMIN)) {
      can(Actions.Manage, 'all');
      // cannot(Actions.Manage, UserEntity, {
      //   orgId: { $ne: user.orgId }, // conditions in depth
      // }).because("it's not on your control");
    } else {
      can(Actions.Read, 'all');
      cannot(Actions.Create, UserEntity).because(
        "Your're not Admin so you can't create",
      );
      cannot(Actions.Update, UserEntity).because(
        "Your're not Admin so you can't update!",
      );
      cannot(Actions.Delete, 'all').because(
        "Your're not Admin so you can't delete!",
      );
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  };
}
