// import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
class AnamnesisHelperService {
  // constructor(private prismaService: PrismaService) {}

  saveAnamnesis(dto) {
    /** on development **/
    // save to database code
    return dto; // if success return form
  }
}

export default AnamnesisHelperService;
