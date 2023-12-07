import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RawatDto } from '../rawat/dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
class RawatHelperService {
  constructor(private prismaService: PrismaService) {}

  getNoRawat(lastNoRawat: string) {
    const numberRawat: number =
      lastNoRawat !== null ? parseInt(lastNoRawat.split('-')[1]) + 1 : 1;
    return `rw-${numberRawat.toString().padStart(3, '0')}`;
  }

  getNoAntrian(lastDate: number, lastAntrian: number) {
    const today: number = new Date().getDate();
    return today === lastDate ? lastAntrian + 1 : 1;
  }

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
    console.log({ result });
    console.log({ rawat });
    const no_antrian: number =
      result === null
        ? 1
        : this.getNoAntrian(result.tgl_antrian.getDate(), result.no_antrian);
    const no_rawat = this.getNoRawat(rawat._max.no_rawat);
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
            message: 'no_rm not registered',
            error: 'Bad request',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw e;
    }
  }
}

export default RawatHelperService;
