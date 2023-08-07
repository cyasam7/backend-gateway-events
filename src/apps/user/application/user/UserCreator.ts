import { BadRequestException, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';
import { EncryptService } from 'src/shared/repositories/EncryptRepository';
import { generateUUID } from 'src/shared/utils/generateUUID';

import { UserEntity } from '../../domain/entity/UserEntity';
import { CreateUserDto } from '../../infrastructure/dto/user.dto';
import { RoleRepository } from '../../infrastructure/repository/role.repository';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserCreatorUseCase implements IUseCase<CreateUserDto, UserEntity> {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
    private encryptService: EncryptService,
  ) {}

  async execute(data: CreateUserDto): Promise<UserEntity> {
    const password = this.encryptService.encrypt(data.password);

    const userValidation = await this.userRepository.findOne({
      email: data.email,
    });

    if (userValidation) {
      throw new BadRequestException('Ya existe un usuario con este email');
    }

    const role = await this.roleRepository.getByCode(data.role);

    if (!role) {
      throw new BadRequestException('No existe ese rol');
    }

    const user = new UserEntity({
      id: generateUUID(),
      email: data.email,
      name: data.email,
      phone: data.phone,
      password,
      role,
    });

    const newUser = await this.userRepository.save(user);

    return newUser;
  }
}
