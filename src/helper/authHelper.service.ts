import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  SignUpDokterDto,
  SignUpDto,
  SignUpPerawatDto,
  SignUpStafDto,
} from 'src/auth/dto';

@Injectable()
class AuthHelperService {
  config: ConfigService;
  argon: any;

  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    config: ConfigService,
  ) {
    this.argon = argon;
    this.config = config;
  }
  async checkIdEmployee(id: string) {
    try {
      const nurse = await this.prismaService.perawat.findUnique({
        where: { id },
      });
      const doctor = await this.prismaService.dokter.findUnique({
        where: { id },
      });
      const staff = await this.prismaService.staf.findUnique({
        where: { id },
      });
      if (!nurse && !doctor && !staff) {
        throw new HttpException(
          {
            message: 'There is no doctor, nurse, or staff with that ID',
            error: 'Not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      if (nurse) return nurse;
      if (doctor) return doctor;
      if (staff) return staff;
    } catch (e) {
      throw e;
    }
  }

  async verifyPassword(hashedPassword: string, password: string) {
    try {
      const verified = await this.argon.verify(hashedPassword, password);
      if (!verified)
        throw new HttpException(
          {
            message: 'Password is wrong',
            error: 'Forbidden',
            status: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN,
        );
      return;
    } catch (e) {
      if (e instanceof TypeError) {
        throw new HttpException(
          {
            message: 'Password is wrong',
            error: 'Forbidden',
            status: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN,
        );
      }
      throw e;
    }
  }

  async findUserById(id: string) {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
      });
      const { nama } = await this.checkIdEmployee(id);
      if (!result) {
        throw new HttpException(
          {
            error: 'Not found',
            message: 'User not found',
            status: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      result['nama'] = nama;
      return result;
    } catch (e) {
      throw e;
    }
  }

  async checkExistId(id: string) {
    try {
      await this.checkIdEmployee(id);
      return;
    } catch (e) {
      throw e;
    }
  }

  async checkSignedUpId(id: string) {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (result) {
        throw new HttpException(
          {
            message: 'ID has been successfully registered before',
            error: 'Conflict',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      return;
    } catch (e) {
      throw e;
    }
  }

  async hashingPassword(password: string) {
    return await this.argon.hash(password);
  }

  async addUser(dto: SignUpDto) {
    const { id, password, role } = dto;
    try {
      return await this.prismaService.user.create({
        data: { id, password, role },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            {
              message: 'Credential taken',
              error: 'Forbidden',
              status: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw e;
    }
  }

  async addStaf(dto: SignUpStafDto) {
    const { id, nama } = dto;
    try {
      return await this.prismaService.staf.create({
        data: { id, nama },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            {
              message: 'Credential Taken',
              error: 'Forbidden',
              status: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw e;
    }
  }

  async addPerawat(dto: SignUpPerawatDto) {
    const { id, nama } = dto;
    try {
      return await this.prismaService.perawat.create({
        data: {
          id,
          nama,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            {
              message: 'Credential Taken',
              error: 'Forbidden',
              status: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw e;
    }
  }

  async addDokter(dto: SignUpDokterDto) {
    const { id, nama, spesialis } = dto;
    try {
      return await this.prismaService.dokter.create({
        data: {
          id,
          nama,
          spesialis,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            {
              message: 'Credential Taken',
              error: 'Forbidden',
              status: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw e;
    }
  }

  async saveToken(refresh_token: string) {
    try {
      return await this.prismaService.token.create({
        data: {
          refresh_token,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async findRefreshToken(refreshToken: string) {
    try {
      return await this.prismaService.token.findUnique({
        where: {
          refresh_token: refreshToken,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async deleteRefreshToken(refreshToken: string) {
    try {
      return await this.prismaService.token.delete({
        where: {
          refresh_token: refreshToken,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async createAccessToken({ id, role }) {
    return await this.jwt.signAsync(
      { id, role },
      {
        secret: this.config.get<string>('SECRET_KEY_ACCESS'),
        expiresIn: '1d',
      },
    );
  }

  async createRefreshToken({ id, role }) {
    return await this.jwt.signAsync(
      { id, role },
      {
        secret: this.config.get<string>('SECRET_KEY_REFRESH'),
        expiresIn: '1d',
      },
    );
  }

  async verifyAccessToken(token: string) {
    return await this.jwt.verify(token, {
      secret: this.config.get<string>('SECRET_KEY_ACCESS'),
    });
  }

  async verifyRefreshToken(token: string) {
    return await this.jwt.verify(token, {
      secret: this.config.get<string>('SECRET_KEY_REFRESH'),
    });
  }
}

export default AuthHelperService;
