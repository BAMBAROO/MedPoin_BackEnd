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
            message: 'Credential taken',
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
      return await this.prismaService.anamnesis.findUnique({
        where: {
          no_rawat,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}

export default AnamnesisHelperService;
