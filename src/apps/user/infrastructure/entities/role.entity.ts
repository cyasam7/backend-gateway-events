import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Permission } from './permission.entity';
import { ERole } from '../../domain/entity/RoleEntity';

@Entity()
export class Role {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, enum: ERole, default: ERole.GUEST })
  code: ERole;

  @OneToMany(() => Permission, (permission) => permission.role, { eager: true })
  permissions: Permission[];
}
