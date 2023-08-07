import { Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { PermissionEntity } from '../../domain/entity/PermissionsEntity';
import { QueryPermissionDTO } from '../../infrastructure/dto/permission.dto';
import { PermissionRepository } from '../../infrastructure/repository/permission.repository';

@Injectable()
export class PermissionGetQueryUseCase
  implements IUseCase<QueryPermissionDTO, PermissionEntity[]>
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(query: QueryPermissionDTO): Promise<PermissionEntity[]> {
    const permission = await this.permissionRepository.find({ ...query });

    return permission;
  }
}
