import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PemeriksaanDto } from '../pemeriksaan/dto';
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
            message: 'Invalid Data',
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
