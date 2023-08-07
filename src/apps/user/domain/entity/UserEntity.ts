import { ERole, RoleEntity } from './RoleEntity';

export interface IQueryUser {
  id?: string;
  email?: string;
  role?: ERole;
  phone?: string;
  refreshToken?: string;
  accessToken?: string;
}

export class UserEntity {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: RoleEntity;
  refreshToken?: string;
  accessToken?: string;

  constructor(data: {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    role: RoleEntity;
    accessToken?: string;
    refreshToken?: string;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.password = data.password;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
    this.role = data.role;
  }
}
