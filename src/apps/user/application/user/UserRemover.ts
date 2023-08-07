import { Injectable } from '@nestjs/common';

import { IUseCase } from 'src/global';

import { UserRepository } from '../../infrastructure/repository/user.repository';

@Injectable()
export class UserRemoverUseCase implements IUseCase<string, void> {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string): Promise<void> {
    await this.userRepository.deleteOne(id);
  }
}
