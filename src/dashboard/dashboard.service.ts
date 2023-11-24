import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const dummyData = [
  {
    patient_name: 'Jerry Mattedi',
    date: '19 May, 2023',
    time: '10:10 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Bryan',
  },
  {
    patient_name: 'Alice Johnson',
    date: '20 May, 2023',
    time: '11:30 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Smith',
  },
  {
    patient_name: 'Bob Anderson',
    date: '21 May, 2023',
    time: '02:45 PM',
    status: 'Selesai',
    doctor_name: 'dr. Johnson',
  },
  {
    patient_name: 'Charlie Brown',
    date: '22 May, 2023',
    time: '03:15 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Martinez',
  },
  {
    patient_name: 'Eva Rodriguez',
    date: '23 May, 2023',
    time: '09:00 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Davis',
  },
  {
    patient_name: 'Frank White',
    date: '24 May, 2023',
    time: '01:20 PM',
    status: 'Selesai',
    doctor_name: 'dr. Wilson',
  },
  {
    patient_name: 'Grace Taylor',
    date: '25 May, 2023',
    time: '04:30 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Adams',
  },
  {
    patient_name: 'Hank Miller',
    date: '26 May, 2023',
    time: '11:45 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Turner',
  },
  {
    patient_name: 'Ivy Lee',
    date: '27 May, 2023',
    time: '03:00 PM',
    status: 'Selesai',
    doctor_name: 'dr. Parker',
  },
  {
    patient_name: 'Jackie Scott',
    date: '28 May, 2023',
    time: '10:00 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Evans',
  },
  {
    patient_name: 'Ken Adams',
    date: '29 May, 2023',
    time: '12:40 PM',
    status: 'Menunggu',
    doctor_name: 'dr. Hill',
  },
  {
    patient_name: 'Lisa Hernandez',
    date: '30 May, 2023',
    time: '02:15 PM',
    status: 'Selesai',
    doctor_name: 'dr. Turner',
  },
  {
    patient_name: 'Mike Gonzalez',
    date: '31 May, 2023',
    time: '09:30 AM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Martinez',
  },
  {
    patient_name: 'Nina Robinson',
    date: '01 June, 2023',
    time: '11:20 AM',
    status: 'Menunggu',
    doctor_name: 'dr. White',
  },
  {
    patient_name: 'Oscar Carter',
    date: '02 June, 2023',
    time: '03:45 PM',
    status: 'Selesai',
    doctor_name: 'dr. Scott',
  },
  {
    patient_name: 'Paula Diaz',
    date: '03 June, 2023',
    time: '01:00 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Adams',
  },
  {
    patient_name: 'Quincy Reed',
    date: '04 June, 2023',
    time: '10:50 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Taylor',
  },
  {
    patient_name: 'Rachel Lee',
    date: '05 June, 2023',
    time: '02:30 PM',
    status: 'Selesai',
    doctor_name: 'dr. Davis',
  },
  {
    patient_name: 'Samuel Turner',
    date: '06 June, 2023',
    time: '12:15 PM',
    status: 'Sedang dilayani',
    doctor_name: 'dr. Hill',
  },
  {
    patient_name: 'Tina Adams',
    date: '07 June, 2023',
    time: '09:40 AM',
    status: 'Menunggu',
    doctor_name: 'dr. Turner',
  },
  {
    patient_name: 'Ulysses Wilson',
    date: '08 June, 2023',
    time: '04:00 PM',
    status: 'Selesai',
    doctor_name: 'dr. Robinson',
  },
];

@Injectable()
export class DashboardService {
  constructor(private prismaService: PrismaService) {}

  getDataDashboard(res) {
    /** on development **/
    return res.send(dummyData);
    // return res.send({
    //   patient_name: 'Jerry Mattedi',
    //   date: '19 May, 2023',
    //   time: '10:10 AM',
    //   status: 'Sedang dilayani',
    //   doctor_name: 'dr.Bryan',
    // });
    // return {
    //   'no-rm': '000002',
    //   'no-ktp': '3217060213911234',
    //   'nama-lengkap': 'Dhimas Sahid Pangestu',
    //   'golongan-darah': 'O',
    //   'tempat-lahir': 'Bandung',
    //   'tanggal-lahir': '30/05/1999',
    //   'alamat-lengkap':
    //     'Jalan Kolonel Masturi No 512 , Cimahi Utara . Kota Cimahi',
    //   'jenis-kelamin': 'L',
    //   'status-perkawinan': 'Menikah',
    //   'nomor-hp': '087823141234',
    //   'nama-keluarga': 'Fulan',
    //   'nomor-hp-keluarga': '081312341234',
    // };
  }
}
