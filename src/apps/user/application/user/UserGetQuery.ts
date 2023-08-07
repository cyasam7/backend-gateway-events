import { Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UserEntity } from '../../domain/entity/UserEntity';
import { QueryUserDTO } from '../../infrastructure/dto/user.dto';
import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserGetQueryUseCase
  implements IUseCase<QueryUserDTO, UserEntity[]>
{
  constructor(private userRepository: UserRepository) {}
  async execute(data: QueryUserDTO): Promise<UserEntity[]> {
    const users = await this.userRepository.find({ ...data });
    return users;
  }
}
