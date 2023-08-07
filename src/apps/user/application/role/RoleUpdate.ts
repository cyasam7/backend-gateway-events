import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UpdateRoleDTO } from '../../infrastructure/dto/role.dto';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';
import { RoleRepository } from '../../infrastructure/repository/role.repository';

interface IInput {
  id: string;
  values: UpdateRoleDTO;
}

@Injectable()
export class RoleUpdateUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async execute({ id, values }: IInput): Promise<void> {
    const role = await this.roleRepository.findOne({ id });

    if (!role) {
      throw new NotFoundException('Entidad no encontrada');
    }

    if (values.permissions) {
      const permissions = await this.permissionRepository.findMany(
        values.permissions,
      );

      if (!permissions.length) {
        throw new NotFoundException('Entidades no encontradas');
      }

      await this.roleRepository.updateOne(id, { permissions });
    }

    await this.roleRepository.updateOne(id, {
      code: values.code,
      name: values.name,
    });
  }
}
