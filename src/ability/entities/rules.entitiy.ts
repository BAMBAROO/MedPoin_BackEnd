import { Role } from '../../auth/entities/user.enum';

export class Dokter {
  role: Role.DOKTER;
  name: string;
}

export class Perawat {
  role: Role.PERAWAT;
  name: string;
}

export class Staf {
  role: Role.STAF;
  name: string;
}

export class Dashboard {}

export class Pasien {}

export class Rawat {}

export class Anamnesis {}

export class Pemeriksaan {}

export class RekamMedis {}
