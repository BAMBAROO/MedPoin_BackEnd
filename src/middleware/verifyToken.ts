import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import AuthHelperService from '../helper/authHelper.service';

@Injectable()
export class VerifyToken implements NestMiddleware {
  constructor(private authHelper: AuthHelperService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const header: string = req.headers['authorization'];
      const token: string = header && header.split(' ')[1];
      await this.authHelper.verifyRefreshToken({ token });

      /** on development **/
      // req['user'] = {
      //   email: payload.email,
      //   role: payload.role,
      // };

      next();
    } catch (err) {
      throw new HttpException(
        {
          message: 'Invalid Credentials',
          error: 'Unauthorized',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
