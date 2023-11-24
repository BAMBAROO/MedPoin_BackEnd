import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Role } from '../auth/entities/user.enum';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      /** on development **/
      // In Here Use CaslJs
      next();
    } catch (e) {
      console.log(e);
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  }
}
