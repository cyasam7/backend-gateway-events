import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IEnvConfig } from 'src/config';
import { IUseCase } from 'src/global';
import { EncryptService } from 'src/shared/repositories/EncryptRepository';

import { LoginUserDTO } from '../../infrastructure/dto/auth.dto';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class LoginUserUseCase implements IUseCase<LoginUserDTO, any> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService<IEnvConfig>,
    private encryptService: EncryptService,
  ) {}
  async execute(data: LoginUserDTO): Promise<any> {
    const user = await this.userRepository.findOne({ email: data.email });

    if (!user) {
      throw new NotFoundException('No se encontro usuario con este email');
    }

    const isValidPassword = this.encryptService.compare(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get('EXPIRATION_TIME_ACCESS_TOKEN') },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get('EXPIRATION_TIME_REFRESH_TOKEN') },
    );

    this.userRepository.updateOne(user.id, { refreshToken, accessToken });

    return { user, accessToken, refreshToken };
  }
}
