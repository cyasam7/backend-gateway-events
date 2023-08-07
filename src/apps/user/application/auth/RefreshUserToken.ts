import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IEnvConfig } from 'src/config';
import { IUseCase } from 'src/global';

import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class RefreshUserTokenUseCase implements IUseCase<string, any> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService<IEnvConfig>,
  ) {}
  async execute(refreshToken: string): Promise<any> {
    const user = await this.userRepository.findOne({ refreshToken });

    if (!user) {
      throw new NotFoundException('No se encontro usuario con refresh token');
    }

    const isValidRefreshToken = this.jwtService.verify(refreshToken);

    if (!isValidRefreshToken) {
      throw new BadRequestException('Refresh token no valido');
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get('EXPIRATION_TIME_ACCESS_TOKEN') },
    );

    await this.userRepository.updateOne(user.id, { accessToken });

    return { accessToken };
  }
}
