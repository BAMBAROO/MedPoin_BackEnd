import { PrismaService } from '../../Database/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import PasienDto from '../../../Application/pasien/dto/pasien.dto';

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

  async all() {
    try {
      const data = await this.prismaService.pasien.findMany({
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
        },
      });
      if (!data) {
        throw new HttpException(
          {
            message: 'Data not found',
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
