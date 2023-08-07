import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UpdatePermissionDTO } from '../../infrastructure/dto/permission.dto';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';

interface IPermissionUpdateUseCase {
  id: string;
  values: UpdatePermissionDTO;
}

@Injectable()
export class PermissionUpdateUseCase
  implements IUseCase<IPermissionUpdateUseCase, void>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute({ id, values }: IPermissionUpdateUseCase): Promise<void> {
    const permission = await this.permissionRepository.findOne({ id });

    if (!permission) {
      throw new NotFoundException('Entidad no encontrada');
    }

    Object.assign(permission, values);

    await this.permissionRepository.updateOne(id, permission);
  }
}
