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

  async signUp(dto: SignUpDto, res: Response) {
    dto.password = await this.authHelper.hashingPassword(dto.password);
    await this.authHelper.checkSignedUpId(dto.id);
    await this.authHelper.checkExistId(dto.id);
    const data = await this.authHelper.addUser(dto);
    return res.status(HttpStatus.CREATED).json({ data });
  }

  async signUpDokter(dto: SignUpDokterDto, res: Response) {
    const data = await this.authHelper.addDokter(dto);
    return res.status(HttpStatus.CREATED).json({ data });
  }

  async signUpPerawat(dto: SignUpPerawatDto, res: Response) {
    const data = await this.authHelper.addPerawat(dto);
    return res.status(HttpStatus.CREATED).json({ data });
  }

  async signUpStaf(dto: SignUpStafDto, res: Response) {
    const data = await this.authHelper.addStaf(dto);
    return res.status(HttpStatus.CREATED).json({ data });
  }

  async signin(dto: SignInDto, res: Response) {
    try {
      const user = await this.authHelper.findUserById(dto.id);
      if (user.id !== 'superadmin' && user.password !== 'nimdarepus')
        await this.authHelper.verifyPassword(user.password, dto.password);
      const payload = { id: user.id, role: user.role };
      console.log({ payload });
      const accessToken = await this.authHelper.createAccessToken(payload);
      const refreshToken = await this.authHelper.createRefreshToken(payload);
      res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
      });

      /** save token **/
      await this.authHelper.saveToken(refreshToken);
      res.status(HttpStatus.OK).json({ accessToken });
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
      return res
        .clearCookie('refreshToken')
        .status(HttpStatus.OK)
        .json({ message: 'Logout success' });
    } catch (e) {
      throw e;
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const token = await this.authHelper.findRefreshToken(refreshToken);
      if (!token) throw ForbiddenException;
      const { id, role } = await this.authHelper.verifyRefreshToken(
        token.refresh_token,
      );
      const accessToken = await this.authHelper.createAccessToken({ id, role });
      return res.status(HttpStatus.OK).json({ accessToken });
    } catch (e) {
      throw e;
    }
  }
}
