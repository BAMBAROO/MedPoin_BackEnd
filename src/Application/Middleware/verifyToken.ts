import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import AuthHelperService from '../../Infrastructure/Repositories/authentication/authHelper.service';

@Injectable()
export class VerifyToken implements NestMiddleware {
  constructor(private authHelper: AuthHelperService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const header: string = req.headers['authorization'];
      const token: string = header && header.split(' ')[1];
      const { id, role } = await this.authHelper.verifyAccessToken(token);
      req['user'] = {
        id,
        role,
      };
      next();
    } catch (err) {
      console.log(err);
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
