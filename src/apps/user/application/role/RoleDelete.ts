import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { RoleRepository } from '../../infrastructure/repository/role.repository';

@Injectable()
export class RoleDeleteUseCase implements IUseCase<string, void> {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findOne({ id });

    if (!role) {
      throw new NotFoundException('Entidad no encontrada');
    }

    await this.roleRepository.deleteOne(id);
  }
}
