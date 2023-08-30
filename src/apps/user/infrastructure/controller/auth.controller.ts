import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guard/auth.guard';

import { GetCurrentUserUseCase } from '../../application/auth/GetCurrentUser';
import { LoginUserUseCase } from '../../application/auth/LoginUser';
import { RefreshUserTokenUseCase } from '../../application/auth/RefreshUserToken';
import { RegisterUserUseCase } from '../../application/auth/RegisterUser';
import { CreateUserDto, LoginUserDTO } from '../dto/auth.dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshAccessTokenUseCase: RefreshUserTokenUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  @Post('/register')
  async registerUser(@Body() data: CreateUserDto): Promise<void> {
    return this.registerUserUseCase.execute(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserDTO): Promise<void> {
    return this.loginUserUseCase.execute(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/me')
  async currentUser(@Request() req): Promise<any> {
    return this.getCurrentUserUseCase.execute({
      token: req.user.accessToken,
      refreshToken: req.user.refreshToken,
    });
  }

  @ApiHeader({
    name: 'refresh_token',
    description: 'Refresh Token Header',
  })
  @Post('/refresh-token')
  async refreshAccessToken(
    @Headers('refresh_token') refresh_token: string,
  ): Promise<any> {
    return this.refreshAccessTokenUseCase.execute(refresh_token);
  }
}
