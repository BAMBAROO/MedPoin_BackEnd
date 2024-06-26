import { PrismaService } from '../../Database/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

function dateFiltering(data: any) {
  const result = data?.map((data: any) => {
    const date = data?.tgl_antrian;
    const dateExtract = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const dateNow = new Date();
    const today = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;
    if (dateExtract === today) {
      return data;
    }
  });
  return result.filter((data: any): boolean => data !== undefined);
}

@Injectable()
class DashboardHelperService {
  constructor(private prismaService: PrismaService) {}

  async dashboard() {
    try {
      const data = await this.prismaService.antrian.findMany({
        select: {
          no_antrian: true,
          no_rawat: true,
          status: true,
          tgl_antrian: true,
          dokter: {
            select: {
              id: true,
              nama: true,
              spesialis: true,
            },
          },
          pasien: {
            select: {
              no_rm: true,
              name: true,
              alamat_lengkap: true,
              no_hp: true,
            },
          },
        },
      });
      return dateFiltering(data);
    } catch (e) {
      throw e;
    }
  }

  async dokter() {
    try {
      const data = await this.prismaService.dokter.findMany();
      if (data.length === 0) {
        throw new HttpException(
          {
            message: 'Dokter Not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async staf() {
    try {
      const data = await this.prismaService.staf.findMany();
      if (data.length === 0) {
        throw new HttpException(
          {
            message: 'Staf Not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async users() {
    try {
      const data = await this.prismaService.user.findMany({
        select: {
          id: true,
          role: true,
        },
      });
      if (data.length === 0) {
        throw new HttpException(
          {
            message: 'Staf Not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (e) {
      throw e;
    }
  }

  async perawat() {
    try {
      const data = await this.prismaService.perawat.findMany();
      if (data.length === 0) {
        throw new HttpException(
          {
            message: 'Perawat Not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (e) {
      throw e;
    }
  }
}

export default DashboardHelperService;
