import { PrismaService } from '../../Database/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PemeriksaanDto } from '../../../Application/pemeriksaan/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
class PemeriksaanHelperService {
  constructor(private prismaService: PrismaService) {}

  async pemeriksaan(dto: PemeriksaanDto) {
    const {
      no_rm,
      no_rawat,
      dokter_id,
      keluhan,
      tindakan,
      diagnosis,
      resep_obat,
    } = dto;
    try {
      const data = await this.prismaService.pemeriksaan.create({
        data: {
          no_rm,
          no_rawat,
          dokter_id,
          keluhan,
          tindakan,
          diagnosis,
          resep_obat,
        },
      });
      await this.prismaService.antrian.update({
        where: {
          no_rawat,
        },
        data: {
          status: 1,
        },
      });
      return data;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            message: 'Failed to create new data. Required data not found.',
            error: 'Conflict',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw e;
    }
  }

  async addRekamMedis({ no_rawat, no_rm }) {
    try {
      const resultAnamnesis = await this.prismaService.anamnesis.findUnique({
        where: {
          no_rawat,
        },
        select: {
          no_anamnesis: true,
        },
      });
      const resultPemeriksaan = await this.prismaService.pemeriksaan.findUnique(
        {
          where: {
            no_rawat,
          },
          select: {
            no_pemeriksaan: true,
          },
        },
      );
      if (!resultAnamnesis || !resultPemeriksaan) {
        throw new HttpException(
          {
            message: 'no_anamnesis or no_pemeriksaan not found',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.prismaService.rekam_medis.create({
        data: {
          no_rawat,
          no_rm,
          no_pemeriksaan: resultPemeriksaan.no_pemeriksaan,
          no_anamnesis: resultAnamnesis.no_anamnesis,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            message: 'Unique constraint failed on the {constraint}',
            error: 'Conflict',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw e;
    }
  }
}

export default PemeriksaanHelperService;
