import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoleEntity } from '../../domain/entity/RoleEntity';
import { IQueryUser, UserEntity } from '../../domain/entity/UserEntity';
import { IUserRepository } from '../../domain/repositories/UserRepository';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async findOne(values: Partial<IQueryUser>): Promise<UserEntity> {
    const query = { ...values, role: undefined };

    if (values.role) {
      const role = await this.roleRepository.findBy({ code: values.role });

      query.role = role;
    }

    try {
      const user = await this.userRepository.findOneOrFail({
        where: { ...query },
        relations: { role: true },
      });

      return new UserEntity(user);
    } catch {
      return null;
    }
  }

  async find(values: Partial<IQueryUser>): Promise<UserEntity[]> {
    const query = { role: undefined };

    if (values.role) {
      const role = await this.roleRepository.findBy({ code: values.role });

      query.role = role;
    }
    const users = await this.userRepository.find({
      where: { ...query },
      relations: { role: true },
    });

    return users.map((user) => new UserEntity(user));
  }

  async updateOne(
    id: string,
    value: Partial<Omit<UserEntity, 'id'>>,
  ): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
    });

    if (!user) {
      throw new NotFoundException('No existe usuario a nivel repo');
    }

    Object.assign(user, value);

    await this.userRepository.save(user);
  }
  async deleteOne(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const myUser = this.userRepository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      phone: user.phone,
      role: user.role,
    });
    await this.userRepository.save(myUser);
    return new UserEntity(myUser);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { email },
        relations: { role: true },
      });
      return new UserEntity({ ...user, role: new RoleEntity(user.role) });
    } catch (error) {
      return null;
    }
  }

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find({ relations: { role: true } });
    return users.map((i) => new UserEntity(i));
  }
}
