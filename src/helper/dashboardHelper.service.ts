// import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const dummyData = [
  {
    rm_id: '123123',
    no_rawat: '123123',
    patient_name: 'Jerry Mattedi',
    date: '19 May, 2023',
    time: '10:10 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Bryan',
  },
  {
    rm_id: '234234',
    no_rawat: '234234',
    patient_name: 'Lisa Johnson',
    date: '20 May, 2023',
    time: '11:30 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Emily',
  },
  {
    rm_id: '345345',
    no_rawat: '345345',
    patient_name: 'Michael Smith',
    date: '21 May, 2023',
    time: '02:45 PM',
    status: 'Selesai',
    doctor_name: 'dr. Samantha',
  },
  {
    rm_id: '456456',
    no_rawat: '456456',
    patient_name: 'Maria Rodriguez',
    date: '22 May, 2023',
    time: '04:20 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Victor',
  },
  {
    rm_id: '567567',
    no_rawat: '567567',
    patient_name: 'John Davis',
    date: '23 May, 2023',
    time: '09:15 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Olivia',
  },
  {
    rm_id: '678678',
    no_rawat: '678678',
    patient_name: 'Emily White',
    date: '24 May, 2023',
    time: '01:50 PM',
    status: 'Selesai',
    doctor_name: 'dr. Matthew',
  },
  {
    rm_id: '789789',
    no_rawat: '789789',
    patient_name: 'Daniel Lee',
    date: '25 May, 2023',
    time: '03:30 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Sophia',
  },
  {
    rm_id: '890890',
    no_rawat: '890890',
    patient_name: 'Jessica Taylor',
    date: '26 May, 2023',
    time: '11:05 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Ethan',
  },
  {
    rm_id: '901901',
    no_rawat: '901901',
    patient_name: 'Christopher Brown',
    date: '27 May, 2023',
    time: '05:40 PM',
    status: 'Selesai',
    doctor_name: 'dr. Isabella',
  },
  {
    rm_id: '112112',
    no_rawat: '112112',
    patient_name: 'Amanda Wilson',
    date: '28 May, 2023',
    time: '08:20 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Alexander',
  },
  {
    rm_id: '223223',
    no_rawat: '223223',
    patient_name: 'William Turner',
    date: '29 May, 2023',
    time: '02:15 PM',
    status: 'Menunggu',
    doctor_name: 'dr. Aria',
  },
  {
    rm_id: '334334',
    no_rawat: '334334',
    patient_name: 'Melissa Harris',
    date: '30 May, 2023',
    time: '06:55 PM',
    status: 'Selesai',
    doctor_name: 'dr. Caleb',
  },
  {
    rm_id: '445445',
    no_rawat: '445445',
    patient_name: 'Jason Miller',
    date: '31 May, 2023',
    time: '10:40 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Zoe',
  },
  {
    rm_id: '556556',
    no_rawat: '556556',
    patient_name: 'Karen Clark',
    date: '01 June, 2023',
    time: '04:30 PM',
    status: 'Menunggu',
    doctor_name: 'dr. Leo',
  },
  {
    rm_id: '667667',
    no_rawat: '667667',
    patient_name: 'George Anderson',
    date: '02 June, 2023',
    time: '09:25 AM',
    status: 'Selesai',
    doctor_name: 'dr. Stella',
  },
  {
    rm_id: '778778',
    no_rawat: '778778',
    patient_name: 'Sophie Moore',
    date: '03 June, 2023',
    time: '01:15 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Noah',
  },
  {
    rm_id: '889889',
    no_rawat: '889889',
    patient_name: 'Ethan Hall',
    date: '04 June, 2023',
    time: '05:50 PM',
    status: 'Menunggu',
    doctor_name: 'dr. Ava',
  },
  {
    rm_id: '990990',
    no_rawat: '990990',
    patient_name: 'Madison Cooper',
    date: '05 June, 2023',
    time: '11:30 AM',
    status: 'Selesai',
    doctor_name: 'dr. Benjamin',
  },
  {
    rm_id: '100100',
    no_rawat: '100100',
    patient_name: 'Oliver Turner',
    date: '06 June, 2023',
    time: '03:20 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Mia',
  },
];

@Injectable()
class DashboardHelperService {
  // constructor(private prismaService: PrismaService) {}

  dashboard() {
    /** on development **/
    /** query join table from (table patient and table entry) for data dashboard **/
    // code this.prismaService
    // SELECT pasien.no_rm, antrian.no_rawat, antrian.no_antrian, pasien.name, tgl_antrian, antrian.status, dokter_id
    // FROM medpoin.pasien
    // LEFT JOIN medpoin.antrian ON medpoin.pasien.no_rm = medpoin.antrian.no_rm;

    /** on development **/
    return dummyData;
  }
}

export default DashboardHelperService;
