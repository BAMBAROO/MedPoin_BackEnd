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
import {
  Anamnesis,
  Dashboard,
  Dokter,
  Pasien,
  Pemeriksaan,
  Perawat,
  Rawat,
  RekamMedis,
  Staf,
} from './entities/rules.entitiy';

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
      | typeof UserEntity
      | typeof Dokter
      | typeof Perawat
      | typeof Staf
      | typeof Dashboard
      | typeof Pasien
      | typeof Rawat
      | typeof Anamnesis
      | typeof Pemeriksaan
      | typeof RekamMedis
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
      can(Actions.Read, RekamMedis);
      can(Actions.Create, Pasien);
      can(Actions.Create, Rawat);
      can(Actions.Create, Anamnesis);
      cannot(Actions.Create, Dokter).because("You're not allowed");
      cannot(Actions.Create, Perawat).because("You're not allowed");
      cannot(Actions.Create, Staf).because("You're not allowed");
      cannot(Actions.Create, UserEntity).because("You're not allowed");
    } else if (user.role === Role.DOKTER) {
      can(Actions.Read, 'all');
      can(Actions.Read, RekamMedis);
      can(Actions.Create, Dashboard);
      can(Actions.Create, Pasien);
      can(Actions.Create, Rawat);
      can(Actions.Create, Anamnesis);
      can(Actions.Create, Pemeriksaan);
      cannot(Actions.Create, Dokter).because("You're not allowed");
      cannot(Actions.Create, Perawat).because("You're not allowed");
      cannot(Actions.Create, Staf).because("You're not allowed");
      cannot(Actions.Create, UserEntity).because("You're not allowed");
    } else if (user.role === Role.PERAWAT) {
      can(Actions.Read, 'all');
      can(Actions.Read, RekamMedis);
      can(Actions.Create, Dashboard);
      can(Actions.Create, Pasien);
      can(Actions.Create, Rawat);
      can(Actions.Create, Anamnesis);
      cannot(Actions.Create, Pemeriksaan).because("You're not allowed");
      cannot(Actions.Create, Dokter).because("You're not allowed");
      cannot(Actions.Create, Perawat).because("You're not allowed");
      cannot(Actions.Create, Staf).because("You're not allowed");
      cannot(Actions.Create, UserEntity).because("You're not allowed");
    } else {
      can(Actions.Read, 'all');
      cannot(Actions.Delete, 'all').because("You're not allowed");
      cannot(Actions.Create, 'all').because("You're not allowed");
      cannot(Actions.Update, 'all').because("You're not allowed");
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subject>,
    });
  };
}
