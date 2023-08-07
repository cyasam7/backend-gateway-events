import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Role } from './role.entity';

@Entity()
export class Permission {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  route: string;

  @Column({ nullable: false, type: 'json' })
  permissions: string[];

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
