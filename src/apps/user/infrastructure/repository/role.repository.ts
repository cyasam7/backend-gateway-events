import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ERole, IQueryRole, RoleEntity } from '../../domain/entity/RoleEntity';
import { IRoleRepository } from '../../domain/repositories/RoleRepository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async save(value: RoleEntity): Promise<RoleEntity> {
    const role = await this.roleRepository.save(value);
    return new RoleEntity({ ...role });
  }

  async findOne(values: Partial<IQueryRole>): Promise<RoleEntity | null> {
    try {
      const role = await this.roleRepository.findOneOrFail({
        where: values,
        relations: { permissions: true },
      });
      return new RoleEntity({ ...role });
    } catch {
      return null;
    }
  }
  async find(values: Partial<IQueryRole>): Promise<RoleEntity[]> {
    const roles = await this.roleRepository.find({
      where: values,
      relations: { permissions: true },
    });
    return roles.map((i) => new RoleEntity({ ...i }));
  }

  async getByCode(code: ERole): Promise<RoleEntity | null> {
    try {
      const role = await this.roleRepository.findOneByOrFail({ code });
      return new RoleEntity({ ...role });
    } catch {
      return null;
    }
  }

  async updateOne(
    id: string,
    value: Partial<Omit<RoleEntity, 'id'>>,
  ): Promise<void> {
    const role = await this.roleRepository.findOneBy({ id });
    Object.assign(role, value);
    await this.roleRepository.save(role);
  }

  async deleteOne(id: string): Promise<void> {
    await this.roleRepository.delete({ id });
  }
}
