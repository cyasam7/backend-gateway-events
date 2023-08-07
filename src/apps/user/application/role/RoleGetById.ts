import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { RoleEntity } from '../../domain/entity/RoleEntity';
import { RoleRepository } from '../../infrastructure/repository/role.repository';

@Injectable()
export class RoleGetOneUseCase implements IUseCase<string, RoleEntity> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne({ id });

    if (!role) {
      throw new NotFoundException('Entidad no encontrada');
    }

    return role;
  }
}
