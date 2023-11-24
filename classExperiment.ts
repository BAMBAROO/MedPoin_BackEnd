// interface Name {
//   name: string | undefined;
//   age: number | null;
//   job: any;
// }
//
// class Person<T> {
//   protected name: T;
//
//   constructor(name: T) {
//     this.name = name;
//   }
//
//   introduceMe(): void {
//     console.log(this.name);
//   }
// }
//
// const bryan: Person<Name> = new Person<Name>({
//   name: 'bryan',
//   age: 19,
//   job: {
//     main: 'programmer',
//     second: 'dawah',
//   },
// });
// bryan.introduceMe();

// const array: number[] = [2, 4, 6, 8, 10];
// const result = array.every((value, index, array) => value % 2 === 0);
// console.log(result);

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }
//
// const userData = {
//   id: 1,
//   name: 'John Doe',
//   email: 'john@example.com',
//   addres: 'durian runtuh',
// };
// const userObject: User = userData as User; // Disini, Anda yakin 'userData' memiliki struktur yang sesuai dengan tipe 'User'.
// console.log(userObject);

// import { UserEntity } from './src/auth/entities/rekam_medis.entity';
// import { Role } from './src/auth/entities/rekam_medis.enum';
//
// const bryan: UserEntity = {
//   name: 'bryan',
//   role: [Role.GOLD],
// };
//
// const adminRole: Role[] = [Role.GOLD, Role.SILVER];
// const userRole: Role[] = [Role.BRONZE];

const namaHewan = ['sapi', 'kuda'];
const hewan = {
  nama: 'kuda',
  jenis: 'pemakan tumbuhan',
};

function pengecekan(nama: string, namaHewan: string[]): boolean {
  return namaHewan.includes(nama);
}

const result = pengecekan(hewan.nama, namaHewan);

console.log(new Date());
