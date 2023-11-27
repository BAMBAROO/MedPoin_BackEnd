import * as argon from 'argon2';
// import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
class RekamMedisHelperService {
  config: ConfigService;
  argon;

  constructor(
    // private prismaService: PrismaService,
    private jwt: JwtService,
    config: ConfigService,
  ) {
    this.argon = argon;
    this.config = config;
  }

  addRekamMedis(dto) {
    /** save to database **/
    // code prisma

    /** on development **/
    if (dto) {
      return dto;
    }
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}

export default RekamMedisHelperService;
