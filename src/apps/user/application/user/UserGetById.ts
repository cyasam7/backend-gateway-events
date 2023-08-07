import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UserEntity } from '../../domain/entity/UserEntity';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserGetByIdUseCase implements IUseCase<string, UserEntity> {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('No se encontro entidad');
    }

    return user;
  }
}
