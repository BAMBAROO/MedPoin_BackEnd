import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
class rekamMedisHelperService {
  constructor(private prismaService: PrismaService) {}

  async rekamMedis() {
    try {
      return 'something';
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
