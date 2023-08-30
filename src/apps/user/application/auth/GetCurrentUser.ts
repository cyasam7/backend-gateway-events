import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUseCase } from 'src/global';

import { UserEntity } from '../../domain/entity/UserEntity';
import { UserRepository } from '../../infrastructure/repository/user.repository';

interface IInputGetCurrentUser {
  token: string;
  refreshToken?: string;
}

@Injectable()
export class GetCurrentUserUseCase
  implements IUseCase<IInputGetCurrentUser, UserEntity>
{
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    token,
    refreshToken,
  }: IInputGetCurrentUser): Promise<UserEntity> {
    const tokenPayload = this.jwtService.verify(token);

    const user = await this.userRepository.findOne({
      id: tokenPayload.sub,
    });

    if (!user) {
      const tokenPayload = this.jwtService.verify(refreshToken);

      if (!tokenPayload) {
        throw new BadRequestException('No existe usuario con access token');
      }
    }
    return user;
  }
}
