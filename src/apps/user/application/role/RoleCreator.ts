import { BadRequestException, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';
import { generateUUID } from 'src/shared/utils/generateUUID';

import { RoleEntity } from '../../domain/entity/RoleEntity';
import { CreateRoleDTO } from '../../infrastructure/dto/role.dto';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';
import { RoleRepository } from '../../infrastructure/repository/role.repository';

@Injectable()
export class RoleCreatorUseCase implements IUseCase<CreateRoleDTO, void> {
  constructor(
    private readonly permissionRepository: PermissionRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async execute(data: CreateRoleDTO): Promise<void> {
    const permissions = await this.permissionRepository.findMany(
      data.permissions,
    );

    const role = await this.roleRepository.findOne({ code: data.code });

    if (role) {
      throw new BadRequestException('Ya existe un rol con ese codigo');
    }

    const newRole = new RoleEntity({
      id: generateUUID(),
      code: data.code,
      name: data.name,
      permissions,
    });

    await this.roleRepository.save(newRole);
  }
}
