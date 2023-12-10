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

  async rekamMedisDetail() {
    try {
      return 'something detail';
    } catch (e) {
      throw e;
    }
  }
}

export default rekamMedisHelperService;
