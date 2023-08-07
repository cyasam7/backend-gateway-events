import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { PermissionEntity } from '../../domain/entity/PermissionsEntity';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';

@Injectable()
export class PermissionGetOneUseCase
  implements IUseCase<string, PermissionEntity>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: string): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.findOne({ id });

    if (!permission) {
      throw new NotFoundException('Entidad no encontrada');
    }

    return permission;
  }
}
