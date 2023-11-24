import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Response, Request } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { Role } from './entities/user.enum';
import AuthHelperService from '../helper/authHelper.service';

@Injectable()
export class AuthService {
  config: ConfigService;
  argon;

  constructor(
    private authHelper: AuthHelperService,
    private jwt: JwtService,
    config: ConfigService,
  ) {
    this.argon = argon;
    this.config = config;
  } // untuk mendapatkan akses terhadap PrismaService (prismaClient) yang juga terhadap akses ke databases

  async signUp(dto: SignUpDto, res: Response) {
    // const { firstName, lastName, email, password } = dto;
    try {
      /** save to database **/
      // const hash = await this.authHelper.hashingPassword(password);

      /** on development **/
      // const user = await this.authHelper.addUser({
      //   firstName,
      //   lastName,
      //   email,
      //   hash,
      // });
      // delete user.hash; // same just select option
      return res.status(HttpStatus.CREATED).json(dto);
    } catch (e) {
      /** if unique column has been taken **/
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(
            { error: 'Credential Taken', status: HttpStatus.FORBIDDEN },
            HttpStatus.FORBIDDEN,
          );
        }
      }
      throw e;
    }
  }

  async signin(dto: SignInDto, res: Response) {
    try {
      /** on development **/
      const { email, password } = dto;

      /** ond development **/
      // const { email, hash } = await this.authHelper.findUserByEmail(dto.email);
      // await this.authHelper.verifyPassword(hash, password);

      /** create token and set token **/
      const payload = { email, hash: password };
      const accessToken = await this.authHelper.createAccessToken(dto);
      const refreshToken = await this.authHelper.createRefreshToken(dto);
      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
      });

      /** on development **/
      // this.authHelper
      //   .updateToken({ email, refreshToken })
      //   .catch((err): void => {
      //     console.log(err);
      //     throw new HttpException(
      //       { error: 'Conflict', status: HttpStatus.CONFLICT },
      //       HttpStatus.CONFLICT,
      //     );
      //   });
      res.status(HttpStatus.OK).json(accessToken);
    } catch (e) {
      throw e;
    }
  }

  async signOut(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken)
        throw new HttpException(
          { error: 'Unauthorized', status: HttpStatus.UNAUTHORIZED },
          HttpStatus.UNAUTHORIZED,
        );

      /** on development **/
      // const { email } = await this.authHelper.findUserByRefreshToken({
      //   refreshToken,
      // });
      // this.authHelper.deleteRefreshToken({ email }).catch((err): void => {
      //   console.log(err);
      //   throw new HttpException(
      //     { error: 'Conflict', status: HttpStatus.CONFLICT },
      //     HttpStatus.CONFLICT,
      //   );
      // });

      return res.clearCookie('refreshToken').sendStatus(HttpStatus.OK);
    } catch (e) {
      throw e;
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      await this.authHelper
        .findUserByRefreshToken({ refreshToken })
        .then(async (user: object) => {
          const accessToken = await this.authHelper.createAccessToken(user);
          return res.status(HttpStatus.OK).json(accessToken);
        })
        .catch((err) => {
          console.log(err);
          throw new HttpException(
            { error: 'Forbidden', status: HttpStatus.FORBIDDEN },
            HttpStatus.FORBIDDEN,
          );
        });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
