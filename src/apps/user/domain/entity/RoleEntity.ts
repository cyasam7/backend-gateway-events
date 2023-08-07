import { PermissionEntity } from './PermissionsEntity';

export enum ERole {
  SUPER_ADMIN = 'RL000',
  ADMIN = 'RL001',
  GUEST = 'RL002',
}

export class IQueryRole {
  id?: string;
  code?: ERole;
  name?: string;
}

export class RoleEntity {
  id: string;
  name: string;
  code: ERole;
  permissions: PermissionEntity[];

  constructor(data: {
    id: string;
    name: string;
    code: ERole;
    permissions: PermissionEntity[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.code = data.code;
    this.permissions = data.permissions;
  }
}
