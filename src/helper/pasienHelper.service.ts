import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import PasienDto from '../pasien/dto/pasien.dto';

@Injectable()
class PasienHelperService {
  constructor(private prismaService: PrismaService) {}

  async addPasien(dto: PasienDto) {
    /** save to database **/
    const {
      no_rm,
      no_ktp,
      name,
      no_bpjs,
      gol_darah,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      no_hp,
      nama_keluarga,
      no_hp_keluarga,
      status_perkawinan,
      alamat_lengkap,
    } = dto;

    try {
      return await this.prismaService.pasien.create({
        data: {
          no_rm,
          no_ktp,
          name,
          tgl_daftar: new Date(),
          no_bpjs,
          gol_darah,
          tempat_lahir,
          tanggal_lahir,
          jenis_kelamin,
          no_hp,
          nama_keluarga,
          no_hp_keluarga,
          alamat_lengkap,
          status_perkawinan,
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

  async rm() {
    try {
      const data = await this.prismaService.pasien.aggregate({
        _max: {
          no_rm: true,
        },
      });
      return data._max;
    } catch (e) {
      throw e;
    }
  }
}

export default PasienHelperService;
