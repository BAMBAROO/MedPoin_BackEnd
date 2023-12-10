import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
class rekamMedisHelperService {
  constructor(private prismaService: PrismaService) {}

  getKunjungan(pasien) {
    const data = [];
    pasien.map((result) => {
      const pasien = {
        no_rm: result.no_rm,
        name: result.name,
        kunjungan_terakhir:
          result.antrian[result.antrian.length - 1].tgl_antrian,
        jumlah_kunjungan: result.antrian.length,
      };
      data.push(pasien);
    });
    return data;
  }

  riwayatRekammedis(data) {
    const result = {
      biodata: {
        no_rm: data.no_rm,
        name: data.name,
        alamat_lengkap: data.alamat_lengkap,
        no_hp: data.no_hp,
        tgl_daftar: data.tgl_daftar,
        no_ktp: data.no_ktp,
        no_bpjs: data.no_bpjs,
        no_hp_keluarga: data.no_hp_keluarga,
        gol_darah: data.gol_darah,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: data.tanggal_lahir,
        status_perkawinan: data.status_perkawinan,
      },
      riwayat: [],
    };
    data.antrian.map((data) => {
      const { no_rawat, tgl_antrian, pemeriksaan, dokter } = data;
      const riwayat = {
        no_rawat,
        tgl_rawat: tgl_antrian,
        dokter: {
          id: dokter?.id || null,
          dokter: dokter?.nama || null,
          spesialis: dokter?.spesialis || null,
        },
        resep_obat: pemeriksaan[0]?.resep_obat || null,
        diagnosis: pemeriksaan[0]?.diagnosis || null,
      };
      result.riwayat.push(riwayat);
    });

    return result;
  }

  async rekamMedis() {
    try {
      const pasien = await this.prismaService.pasien.findMany({
        select: {
          no_rm: true,
          name: true,
          antrian: {
            select: {
              tgl_antrian: true,
            },
          },
        },
      });
      if (!pasien) {
        throw new HttpException(
          {
            message: 'Pasien Not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.getKunjungan(pasien);
    } catch (e) {
      throw e;
    }
  }

  async rekamMedisDetail({ no_rm }) {
    try {
      const result = await this.prismaService.pasien.findUnique({
        select: {
          no_rm: true,
          name: true,
          alamat_lengkap: true,
          no_hp: true,
          tgl_daftar: true,
          no_ktp: true,
          no_bpjs: true,
          no_hp_keluarga: true,
          gol_darah: true,
          tempat_lahir: true,
          tanggal_lahir: true,
          status_perkawinan: true,
          antrian: {
            select: {
              tgl_antrian: true,
              no_rawat: true,
              // dokter_id: true,
              pemeriksaan: {
                select: {
                  resep_obat: true,
                  diagnosis: true,
                },
              },
              dokter: {
                select: {
                  id: true,
                  nama: true,
                  spesialis: true,
                },
              },
            },
          },
        },
        where: {
          no_rm,
        },
      });
      if (!result) {
        throw new HttpException(
          {
            message: 'Data not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return this.riwayatRekammedis(result);
    } catch (e) {
      throw e;
    }
  }
}

export default rekamMedisHelperService;
