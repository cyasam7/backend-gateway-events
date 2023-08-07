import {
  IReadRepository,
  IWriteRepository,
} from 'src/shared/base/crud.repository';

import { IQueryRole, RoleEntity } from '../entity/RoleEntity';

export interface IRoleRepository
  extends IWriteRepository<RoleEntity>,
    IReadRepository<IQueryRole, RoleEntity> {
  getByCode(code: string): Promise<RoleEntity | null>;
}
