import {
  IReadRepository,
  IWriteRepository,
} from 'src/shared/base/crud.repository';

import { IQueryUser, UserEntity } from '../entity/UserEntity';

export interface IUserRepository
  extends IWriteRepository<UserEntity>,
    IReadRepository<IQueryUser, UserEntity> {
  getByEmail(email: string): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity[]>;
}
