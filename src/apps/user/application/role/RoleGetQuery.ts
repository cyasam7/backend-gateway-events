import { Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { RoleEntity } from '../../domain/entity/RoleEntity';
import { QueryRoleDTO } from '../../infrastructure/dto/role.dto';
import { RoleRepository } from '../../infrastructure/repository/role.repository';

@Injectable()
export class RoleGetQueryUseCase
  implements IUseCase<QueryRoleDTO, RoleEntity[]>
{
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(data: QueryRoleDTO): Promise<RoleEntity[]> {
    const role = await this.roleRepository.find({ ...data });

    return role;
  }
}
