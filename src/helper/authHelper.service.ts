import * as argon from 'argon2';
// import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
class AuthHelperService {
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

  // async getUsers() {
  //   const result = await this.prismaService.accounts.findMany();
  //   if (!result)
  //     throw new HttpException(
  //       {
  //         message: 'Users not found',
  //         error: 'Not Found',
  //         status: HttpStatus.NOT_FOUND,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   return null;
  // }

  async verifyPassword(hashedPassword, password) {
    if (!(await this.argon.verify(hashedPassword, password)))
      throw new HttpException(
        {
          message: 'Password is wrong',
          error: 'Forbidden',
          status: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );
    return;
  }

  async hashingPassword(password) {
    return await this.argon.hash(password);
  }

  // addUser({ firstName, lastName, email, hash }) {
  //   return this.prismaService.accounts.create({
  //     data: {
  //       firstName,
  //       lastName,
  //       email,
  //       hash,
  //     },
  //   });
  // }

  // async findUserByEmail(email) {
  //   const result = await this.prismaService.accounts.findUnique({
  //     where: {
  //       email: email,
  //     },
  //     select: {
  //       email: true,
  //       hash: true,
  //       id: true,
  //     },
  //   });
  //   if (!result)
  //     throw new HttpException(
  //       {
  //         message: 'No user with that email',
  //         error: 'Not Found',
  //         status: HttpStatus.NOT_FOUND,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   return result;
  // }

  // findUserByRefreshToken({ refreshToken }) {
  //   return this.prismaService.accounts.findUnique({
  //     where: {
  //       refreshToken: refreshToken,
  //     },
  //     select: {
  //       email: true,
  //       id: true,
  //     },
  //   });
  // }

  // updateToken({ email, refreshToken }) {
  //   return this.prismaService.accounts.update({
  //     where: {
  //       email: email,
  //     },
  //     data: {
  //       refreshToken: refreshToken,
  //     },
  //   });
  // }

  // deleteRefreshToken({ email }) {
  //   return this.prismaService.accounts.update({
  //     where: {
  //       email: email,
  //     },
  //     data: {
  //       refreshToken: null,
  //     },
  //   });
  // }

  async createAccessToken({ user_id = 'something', hash = 'something' }) {
    return await this.jwt.signAsync(
      { user_id, hash },
      {
        secret: this.config.get<string>('SECRET_KEY_ACCESS'),
        expiresIn: '40s',
      },
    );
  }

  async createRefreshToken({ user_id = 'something', hash = 'something' }) {
    return await this.jwt.signAsync(
      { user_id, hash },
      {
        secret: this.config.get<string>('SECRET_KEY_REFRESH'),
        expiresIn: '1d',
      },
    );
  }

  async verifyRefreshToken({ token }) {
    return await this.jwt.verifyAsync(token, {
      secret: this.config.get<string>('SECRET_KEY_ACCESS'),
    });
  }
}

export default AuthHelperService;
