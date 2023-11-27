import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SignInDto, SignUpDto } from './dto';
// import { Roles } from './role.decorator';
// import { Role } from './entities/user.enum';
import { AbilityFactory, Actions } from '../ability/ability.factory';
// import { UserEntity } from './entities/user.entity';
// import { ForbiddenError } from '@casl/ability';
// import { CheckAbilities } from '../ability/ablity.decorator';
// import { AbilitiesGuard } from '../ability/ability.guard';

// CONTROLLER UNTUK MENGELOLA ROUTER DAN VALIDATION
@Controller()
export class AuthController {
  private readonly authService: AuthService;
  private abilityFactory: AbilityFactory;

  constructor(authService: AuthService, abilityFactory: AbilityFactory) {
    this.authService = authService;
    this.abilityFactory = abilityFactory;
  }

  /** allow for role -> SUPERADMIN **/
  @Post('signup')
  signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(dto, res);
  }

  /** allow for role -> all role **/
  @Post('signin')
  logIn(@Body() dto: SignInDto, @Res() res: Response) {
    return this.authService.signin(dto, res);
  }

  /** allow for role -> all role **/
  @Delete('signout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.signOut(req, res);
  }

  /** free endpoint **/
  /** on development **/
  // @Get('token')
  // refreshToken(@Req() req: Request, @Res() res: Response) {
  //   return this.authService.refreshToken(req, res);
  // }

  /** for checking role example **/

  // @Post('role')
  // rolePost(@Req() req: any) {
  //   const ability = this.abilityFactory.defineAbility(req.user);
  //   try {
  //     ForbiddenError.from(ability).throwUnlessCan(Actions.Create, UserEntity);
  //     return 'helloworld';
  //   } catch (error) {
  //     throw new ForbiddenException(error.message);
  //   }
  // }

  // @Delete('role')
  // roleDelete(@Req() req: any) {
  //   const ability = this.abilityFactory.defineAbility(req.user);
  //
  //   try {
  //     /** Find User That Want To Get Update **/
  //     const userNeedToGetDelete: UserEntity = {
  //       name: 'bruce',
  //       role: [Role.GOLD],
  //       orgId: 2,
  //     };
  //     ForbiddenError.from(ability).throwUnlessCan(
  //       Actions.Delete,
  //       userNeedToGetDelete,
  //     );
  //     return 'success delete!';
  //   } catch (error) {
  //     throw new ForbiddenException(error.message);
  //   }
  // }

  // @Patch('role')
  // @UseGuards(AbilitiesGuard)
  // @CheckAbilities({ action: Actions.Update, subject: UserEntity })
  // rolePatch(@Req() req: any) {
  //   return 'success update';
  // }
}
