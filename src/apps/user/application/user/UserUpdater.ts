import { Injectable, NotFoundException } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UpdateUserDTO } from '../../infrastructure/dto/user.dto';
import { RoleRepository } from '../../infrastructure/repository/role.repository';
import { UserRepository } from '../../infrastructure/repository/user.repository';

interface IUserUpdaterUseCase {
  id: string;
  data: UpdateUserDTO;
}

@Injectable()
export class UserUpdaterUseCase implements IUseCase<IUserUpdaterUseCase, void> {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async execute({ data, id }: IUserUpdaterUseCase): Promise<void> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('No se encontro usuario para actualizar');
    }

    if (data.role) {
      const role = await this.roleRepository.findOne({ code: data.role });
      if (!role) {
        throw new NotFoundException('No se encontro role para actualizar');
      }
      await this.userRepository.updateOne(id, { role });
    }

    await this.userRepository.updateOne(id, {
      email: data.email,
      name: data.name,
      phone: data.phone,
    });
  }
}
