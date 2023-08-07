import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from 'src/global';

import { UserEntity } from '../../domain/entity/UserEntity';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class GetCurrentUserUseCase implements IUseCase<string, UserEntity> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(token: string): Promise<UserEntity> {
    const tokenPayload = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({
      accessToken: tokenPayload.sub,
    });
    if (!user) {
      throw new BadRequestException('No existe usuario con access token');
    }
    return user;
  }
}
