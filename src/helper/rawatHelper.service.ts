import * as argon from 'argon2';
// import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
class RawatHelperService {
  // constructor(private prismaService: PrismaService) {}

  listPatientDoctor() {
    /** get list patient and doctor from table patient and doctor **/
    const patient = [
      {
        no_rm: '000001',
        no_ktp: 3217060213911235,
        nama_lengkap: 'Anisa Putri Utami',
        golongan_darah: 'A',
        tempat_lahir: 'Jakarta',
        tanggal_lahir: '20/08/1990',
        alamat_lengkap: 'Jalan Merdeka No 123, Jakarta Pusat',
        jenis_kelamin: 'P',
        status_perkawinan: 'Belum Menikah',
        nomor_hp: '081234567890',
        nama_keluarga: 'Budi',
        nomor_hp_keluarga: '085612345678',
      },
      {
        no_rm: '000002',
        no_ktp: 3217060213911236,
        nama_lengkap: 'Rizky Pratama',
        golongan_darah: 'B',
        tempat_lahir: 'Surabaya',
        tanggal_lahir: '15/03/1985',
        alamat_lengkap: 'Jalan Kebon Jukut No 45, Surabaya Timur',
        jenis_kelamin: 'L',
        status_perkawinan: 'Menikah',
        nomor_hp: '087612345678',
        nama_keluarga: 'Sari',
        nomor_hp_keluarga: '081212345678',
      },
      {
        no_rm: '000003',
        no_ktp: 3217060213911237,
        nama_lengkap: 'Dewi Anggraeni',
        golongan_darah: 'AB',
        tempat_lahir: 'Bandung',
        tanggal_lahir: '10/11/1995',
        alamat_lengkap: 'Jalan Pahlawan No 56, Bandung Selatan',
        jenis_kelamin: 'P',
        status_perkawinan: 'Belum Menikah',
        nomor_hp: '082134567890',
        nama_keluarga: 'Agus',
        nomor_hp_keluarga: '081512345678',
      },
      {
        no_rm: '000004',
        no_ktp: 3217060213911238,
        nama_lengkap: 'Ahmad Fauzi',
        golongan_darah: 'O',
        tempat_lahir: 'Yogyakarta',
        tanggal_lahir: '25/06/1988',
        alamat_lengkap: 'Jalan Malioboro No 78, Yogyakarta',
        jenis_kelamin: 'L',
        status_perkawinan: 'Menikah',
        nomor_hp: '089812345678',
        nama_keluarga: 'Lina',
        nomor_hp_keluarga: '081612345678',
      },
      {
        no_rm: '000005',
        no_ktp: 3217060213911239,
        nama_lengkap: 'Siti Nurhayati',
        golongan_darah: 'A',
        tempat_lahir: 'Medan',
        tanggal_lahir: '03/04/1992',
        alamat_lengkap: 'Jalan Medan Baru No 34, Medan',
        jenis_kelamin: 'P',
        status_perkawinan: 'Belum Menikah',
        nomor_hp: '083612345678',
        nama_keluarga: 'Rudi',
        nomor_hp_keluarga: '081712345678',
      },
      {
        no_rm: '000006',
        no_ktp: 3217060213911240,
        nama_lengkap: 'Faisal Ramadhan',
        golongan_darah: 'B',
        tempat_lahir: 'Semarang',
        tanggal_lahir: '18/09/1993',
        alamat_lengkap: 'Jalan Pandanaran No 90, Semarang',
        jenis_kelamin: 'L',
        status_perkawinan: 'Menikah',
        nomor_hp: '088812345678',
        nama_keluarga: 'Linda',
        nomor_hp_keluarga: '081812345678',
      },
      {
        no_rm: '000007',
        no_ktp: 3217060213911241,
        nama_lengkap: 'Nurul Hidayah',
        golongan_darah: 'AB',
        tempat_lahir: 'Makassar',
        tanggal_lahir: '22/07/1997',
        alamat_lengkap: 'Jalan Hasanuddin No 45, Makassar',
        jenis_kelamin: 'P',
        status_perkawinan: 'Belum Menikah',
        nomor_hp: '084512345678',
        nama_keluarga: 'Bambang',
        nomor_hp_keluarga: '081912345678',
      },
      {
        no_rm: '000008',
        no_ktp: 3217060213911242,
        nama_lengkap: 'Hendri Kurniawan',
        golongan_darah: 'O',
        tempat_lahir: 'Balikpapan',
        tanggal_lahir: '14/12/1994',
        alamat_lengkap: 'Jalan Sudirman No 67, Balikpapan',
        jenis_kelamin: 'L',
        status_perkawinan: 'Menikah',
        nomor_hp: '085712345678',
        nama_keluarga: 'Rina',
        nomor_hp_keluarga: '082112345678',
      },
      {
        no_rm: '000009',
        no_ktp: 3217060213911243,
        nama_lengkap: 'Eka Fitriani',
        golongan_darah: 'A',
        tempat_lahir: 'Denpasar',
        tanggal_lahir: '30/01/1991',
        alamat_lengkap: 'Jalan Gatot Subroto No 23, Denpasar',
        jenis_kelamin: 'P',
        status_perkawinan: 'Belum Menikah',
        nomor_hp: '086512345678',
        nama_keluarga: 'Dodi',
        nomor_hp_keluarga: '082212345678',
      },
      {
        no_rm: '000010',
        no_ktp: 3217060213911244,
        nama_lengkap: 'Arief Setiawan',
        golongan_darah: 'B',
        tempat_lahir: 'Palembang',
        tanggal_lahir: '08/06/1986',
        alamat_lengkap: 'Jalan Sudirman No 89, Palembang',
        jenis_kelamin: 'L',
        status_perkawinan: 'Menikah',
        nomor_hp: '089212345678',
        nama_keluarga: 'Diana',
        nomor_hp_keluarga: '082312345678',
      },
    ];
    const doctor = [
      {
        nama: 'Dr. Bryan Anderson',
        spesialis: 'Bedah Umum',
      },
      {
        nama: 'Dr. Michelle Tan',
        spesialis: 'Dokter Anak',
      },
      {
        nama: 'Dr. Jonathan Smith',
        spesialis: 'Dokter Jantung',
      },
      {
        nama: 'Dr. Sarah Lee',
        spesialis: 'Dokter Mata',
      },
      {
        nama: 'Dr. Kevin Johnson',
        spesialis: 'Dokter Gigi',
      },
    ];
    return { patient, doctor };
  }

  addRawat(dto) {
    const { no_rm, no_rawat, dokter_id } = dto;
    const tgl_antrian = Date.now();
    const status = 0;
    const no_antrian = 'generated or increment';

    /** save to database table antrian/entry **/

    // if success
    return { no_antrian, tgl_antrian, no_rawat, no_rm, dokter_id, status };
  }
}

export default RawatHelperService;
