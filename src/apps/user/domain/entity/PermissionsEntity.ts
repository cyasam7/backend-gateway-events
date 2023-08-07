export interface IQueryPermission {
  id?: string;
  name?: string;
  route?: string;
}

export class PermissionEntity {
  readonly id: string;
  readonly name: string;
  readonly route: string;
  readonly permissions: string[];

  constructor(data: {
    id: string;
    name: string;
    route: string;
    permissions: string[];
  }) {
    this.id = data.id;
    this.name = data.name;
    this.route = data.route;
    this.permissions = data.permissions;
  }
}
