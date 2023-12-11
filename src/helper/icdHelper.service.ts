import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
class IcdHelperService {
  constructor(private prismaService: PrismaService) {}

  async icd10() {
    try {
      return await this.prismaService.icd10.findMany();
    } catch (e) {
      throw e;
    }
  }

  async icd9() {
    try {
      return await this.prismaService.icd9.findMany();
    } catch (e) {
      throw e;
    }
  }
}

export default IcdHelperService;
