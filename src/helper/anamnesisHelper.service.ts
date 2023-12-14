import { AnamnesisDto } from 'src/anamnesis/dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Injectable()
class AnamnesisHelperService {
  constructor(private prismaService: PrismaService) {}

  async addAnamnesis(dto: AnamnesisDto) {
    try {
      const {
        no_rm,
        no_rawat,
        dokter_id,
        perawat_id,
        berat,
        tinggi,
        tensi,
        saturasi,
        suhu,
      } = dto;
      return await this.prismaService.anamnesis.create({
        data: {
          no_rm,
          no_rawat,
          dokter_id,
          perawat_id,
          berat,
          tinggi,
          tensi,
          saturasi,
          suhu,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            message: 'Failed to create new data. Required data not found',
            error: 'Conflict',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }

      if (e instanceof PrismaClientValidationError) {
        throw new HttpException(
          {
            message: 'Incorrect field type provided',
            error: 'Conflict',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw e;
    }
  }

  async getAnamnesis(no_rawat) {
    try {
      const result = await this.prismaService.anamnesis.findUnique({
        where: {
          no_rawat,
        },
        select: {
          no_rm: true,
          no_rawat: true,
          dokter_id: true,
          perawat_id: true,
          tinggi: true,
          berat: true,
          suhu: true,
          saturasi: true,
          tensi: true,
          no_anamnesis: true,
          pasien: {
            select: {
              tanggal_lahir: true,
              name: true,
            },
          },
        },
      });
      if (!result) {
        throw new HttpException(
          {
            message: 'Anamnesis data not available yet',
            error: 'Unprocessable Entity',
            status: HttpStatus.UNPROCESSABLE_ENTITY,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      console.log({ result });
      return {
        no_rm: result.no_rm,
        no_rawat: result.no_rawat,
        no_anamnesis: result.no_anamnesis,
        dokter_id: result.dokter_id,
        perawat_id: result.perawat_id,
        tinggi: result.tinggi,
        berat: result.berat,
        suhu: result.suhu,
        tensi: result.tensi,
        saturasi: result.saturasi,
        name: result.pasien.name,
        tanggal_lahir: result.pasien.tanggal_lahir,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default AnamnesisHelperService;
