import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RawatDto } from '../rawat/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

function getToday() {
  const javascriptDate = new Date();
  const date = javascriptDate.getDate();
  const month = javascriptDate.getMonth() + 1;
  const year = javascriptDate.getFullYear();
  return { date, month, year };
}

function getNoRawat(lastNoRawat: string) {
  const { date, month, year } = getToday();
  const numberRawat: number =
    lastNoRawat !== null ? parseInt(lastNoRawat.split('/')[4]) + 1 : 1;
  return `RJ/${year}/${month}/${date}/${numberRawat
    .toString()
    .padStart(3, '0')}`;
}

function getNoAntrian(lastDate: number, lastAntrian: number) {
  const { date } = getToday();
  return date === lastDate ? lastAntrian + 1 : 1;
}

@Injectable()
class RawatHelperService {
  constructor(private prismaService: PrismaService) {}

  async getDataToday() {
    const result = await this.prismaService.antrian.findFirst({
      orderBy: {
        tgl_antrian: 'desc',
      },
    });
    const rawat = await this.prismaService.antrian.aggregate({
      _max: {
        no_rawat: true,
      },
    });
    const no_antrian: number =
      result === null
        ? 1
        : getNoAntrian(result.tgl_antrian.getDate(), result.no_antrian);
    const no_rawat = getNoRawat(rawat._max.no_rawat);
    return { no_rawat, no_antrian };
  }

  async addRawat(dto: RawatDto) {
    const { no_rm, dokter_id } = dto;
    try {
      const { no_rawat, no_antrian } = await this.getDataToday();
      return await this.prismaService.antrian.create({
        data: {
          no_antrian,
          no_rm,
          tgl_antrian: new Date(),
          dokter_id,
          status: 0,
          no_rawat,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            message: 'Failed to create new data. Required data not found.',
            error: 'Bad request',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw e;
    }
  }
}

export default RawatHelperService;
