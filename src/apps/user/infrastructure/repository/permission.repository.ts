import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import {
  IQueryPermission,
  PermissionEntity,
} from '../../domain/entity/PermissionsEntity';
import { IPermissionRepository } from '../../domain/repositories/PermissionRepository';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findMany(data: string[]): Promise<PermissionEntity[]> {
    const permissions = await this.permissionRepository.findBy({
      id: In(data),
    });
    return permissions.map((i) => new PermissionEntity({ ...i }));
  }

  async save(value: PermissionEntity): Promise<PermissionEntity> {
    const permission = await this.permissionRepository.save(value);
    return new PermissionEntity({ ...permission });
  }

  async updateOne(
    id: string,
    value: Omit<PermissionEntity, 'id'>,
  ): Promise<void> {
    const permission = await this.permissionRepository.findOneBy({ id });
    if (!permission) {
      throw new NotFoundException();
    }
    await this.permissionRepository.update({ id }, value);
  }

  async deleteOne(id: string): Promise<void> {
    await this.permissionRepository.delete({ id });
  }

  async findOne(
    values: Partial<IQueryPermission>,
  ): Promise<PermissionEntity | null> {
    try {
      const permission = await this.permissionRepository.findOneByOrFail({
        ...values,
      });
      return new PermissionEntity({ ...permission });
    } catch {
      return null;
    }
  }

  async find(values: Partial<IQueryPermission>): Promise<PermissionEntity[]> {
    const permissions = await this.permissionRepository.findBy({ ...values });
    return permissions.map((i) => new PermissionEntity({ ...i }));
  }
}
