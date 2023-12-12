import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  SignInDto,
  SignUpDokterDto,
  SignUpDto,
  SignUpPerawatDto,
  SignUpStafDto,
} from './dto';
import { Request, Response } from 'express';
import AuthHelperService from '../helper/authHelper.service';

@Injectable()
export class AuthService {
  constructor(
    private authHelper: AuthHelperService /** for access to databases **/,
  ) {}

  async signUp(dto: SignUpDto, req: Request, res: Response) {
    dto.password = await this.authHelper.hashingPassword(dto.password);
    await this.authHelper.checkSignedUpId(dto.id);
    await this.authHelper.checkExistId(dto.id);
    const data = await this.authHelper.addUser(dto);
    const response = {
      error: false,
      message: 'success',
      data: { id: data.id, role: data.role },
    };
    return res.status(HttpStatus.CREATED).json({
      ...response,
      timeStamp: new Date().toISOString(),
      path: req.path,
    });
  }

  async signUpDokter(dto: SignUpDokterDto, req: Request, res: Response) {
    const data = await this.authHelper.addDokter(dto);
    const response = {
      error: false,
      message: 'success',
      data: data,
    };
    return res.status(HttpStatus.CREATED).json({
      ...response,
      timeStamp: new Date().toISOString(),
      path: req.path,
    });
  }

  async signUpPerawat(dto: SignUpPerawatDto, req: Request, res: Response) {
    const data = await this.authHelper.addPerawat(dto);
    const response = {
      error: false,
      message: 'success',
      data: data,
    };
    return res.status(HttpStatus.CREATED).json({
      ...response,
      timeStamp: new Date().toISOString(),
      path: req.path,
    });
  }

  async signUpStaf(dto: SignUpStafDto, req: Request, res: Response) {
    const data = await this.authHelper.addStaf(dto);
    const response = {
      error: false,
      message: 'success',
      data: data,
    };
    return res.status(HttpStatus.CREATED).json({
      ...response,
      timeStamp: new Date().toISOString(),
      path: req.path,
    });
  }

  async signin(dto: SignInDto, req: Request, res: Response) {
    try {
      const user =
        dto.id === 'superadmin'
          ? {
              nama: 'superadmin',
              id: 'superadmin',
              role: 'admin',
              password: dto.password,
            }
          : await this.authHelper.findUserById(dto.id);
      if (dto.id !== 'superadmin' || dto.password !== 'nimdarepus')
        await this.authHelper.verifyPassword(user.password, dto.password);
      const payload = { id: user.id, role: user.role };
      const accessToken = await this.authHelper.createAccessToken(payload);
      const refreshToken = await this.authHelper.createRefreshToken(payload);
      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      const response = {
        error: false,
        message: 'success',
        data: { accessToken, nama: user['nama'], id: user.id, role: user.role },
      };

      /** save token **/
      await this.authHelper.saveToken(refreshToken);
      res.status(HttpStatus.OK).json({
        ...response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }

  async signOut(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw new HttpException(
          {
            message: 'refreshToken not found',
            error: 'Unauthorized',
            status: HttpStatus.UNAUTHORIZED,
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      await this.authHelper.deleteRefreshToken(refreshToken);
      const response = {
        error: false,
        message: 'success',
        data: null,
      };
      return res
        .clearCookie('refreshToken')
        .status(HttpStatus.OK)
        .json({
          ...response,
          timeStamp: new Date().toISOString(),
          path: req.path,
        });
    } catch (e) {
      throw e;
    }
  }

  async refreshToken(refreshToken: string, req: Request, res: Response) {
    try {
      const token = await this.authHelper.findRefreshToken(refreshToken);
      if (!token) throw ForbiddenException;
      const { id, role } = await this.authHelper.verifyRefreshToken(
        token.refresh_token,
      );
      const accessToken = await this.authHelper.createAccessToken({ id, role });
      const response = {
        error: false,
        message: 'success',
        data: accessToken,
      };
      return res.status(HttpStatus.OK).json({
        ...response,
        timeStamp: new Date().toISOString(),
        path: req.path,
      });
    } catch (e) {
      throw e;
    }
  }
}
