import {
  IReadRepository,
  IWriteRepository,
} from 'src/shared/base/crud.repository';

import {
  IQueryPermission,
  PermissionEntity,
} from '../entity/PermissionsEntity';

export interface IPermissionRepository
  extends IWriteRepository<PermissionEntity>,
    IReadRepository<IQueryPermission, PermissionEntity> {
  findMany(data: string[]): Promise<PermissionEntity[]>;
}
