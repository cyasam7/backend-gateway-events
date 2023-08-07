import { BadRequestException, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';
import { generateUUID } from 'src/shared/utils/generateUUID';

import { PermissionEntity } from '../../domain/entity/PermissionsEntity';
import { CreatePermissionDTO } from '../../infrastructure/dto/permission.dto';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';

@Injectable()
export class PermissionCreatorUseCase
  implements IUseCase<CreatePermissionDTO, void>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(data: CreatePermissionDTO): Promise<void> {
    const permission = await this.permissionRepository.findOne({
      route: data.route,
    });

    if (permission) {
      throw new BadRequestException('Ya existe un permiso con esta ruta');
    }

    const newPermission = new PermissionEntity({ ...data, id: generateUUID() });
    await this.permissionRepository.save(newPermission);
  }
}
