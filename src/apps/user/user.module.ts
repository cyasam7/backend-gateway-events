import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EMicroservices, EQueue } from 'src/global';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { RabbitMQModule } from 'src/shared/modules/RabbitMQ.module';

import { GetCurrentUserUseCase } from './application/auth/GetCurrentUser';
import { LoginUserUseCase } from './application/auth/LoginUser';
import { RefreshUserTokenUseCase } from './application/auth/RefreshUserToken';
import { RegisterUserUseCase } from './application/auth/RegisterUser';
import { PermissionGetOneUseCase } from './application/permissions/PermissionGetById';
import { PermissionGetQueryUseCase } from './application/permissions/PermissionGetQuery';
import { PermissionCreatorUseCase } from './application/permissions/PermissionsCreator';
import { PermissionUpdateUseCase } from './application/permissions/PermissionUpdate';
import { RoleCreatorUseCase } from './application/role/RoleCreator';
import { RoleDeleteUseCase } from './application/role/RoleDelete';
import { RoleGetOneUseCase } from './application/role/RoleGetById';
import { RoleGetQueryUseCase } from './application/role/RoleGetQuery';
import { RoleUpdateUseCase } from './application/role/RoleUpdate';
import { UserCreatorUseCase } from './application/user/UserCreator';
import { UserGetByIdUseCase } from './application/user/UserGetById';
import { UserGetQueryUseCase } from './application/user/UserGetQuery';
import { UserRemoverUseCase } from './application/user/UserRemover';
import { UserUpdaterUseCase } from './application/user/UserUpdater';
import { NotificationRegisterEventHandler } from './domain/events';
import { AuthController } from './infrastructure/controller/auth.controller';
import { PermissionController } from './infrastructure/controller/permission.controller';
import { RoleController } from './infrastructure/controller/role.controller copy';
import { UserController } from './infrastructure/controller/user.controller';
import { Permission } from './infrastructure/entities/permission.entity';
import { Role } from './infrastructure/entities/role.entity';
import { User } from './infrastructure/entities/user.entity';
import { PermissionRepository } from './infrastructure/repository/permission.repository';
import { RoleRepository } from './infrastructure/repository/role.repository';
import { UserRepository } from './infrastructure/repository/user.repository';
import { EncryptService } from '../../shared/repositories/EncryptRepository';
import { PermmissionGuard } from 'src/shared/guard/permission.guard';

@Module({
  imports: [
    //ENTITIES
    CqrsModule,
    TypeOrmModule.forFeature([Permission, User, Role]),
    RabbitMQModule.register({
      name: EMicroservices.NOTIFICATIONS,
      queue: EQueue.NOTIFICATIONS,
    }),
  ],
  controllers: [
    AuthController,
    UserController,
    RoleController,
    PermissionController,
  ],
  providers: [
    // EVENTS
    NotificationRegisterEventHandler,
    //USE CASE
    //PERMISSION
    PermissionCreatorUseCase,
    PermissionUpdateUseCase,
    PermissionGetOneUseCase,
    PermissionGetQueryUseCase,
    //ROLE
    RoleCreatorUseCase,
    RoleUpdateUseCase,
    RoleGetOneUseCase,
    RoleGetQueryUseCase,
    RoleDeleteUseCase,

    //USER
    UserCreatorUseCase,
    UserGetByIdUseCase,
    UserGetQueryUseCase,
    UserUpdaterUseCase,
    UserRemoverUseCase,

    //AUTH
    LoginUserUseCase,
    RegisterUserUseCase,
    RefreshUserTokenUseCase,
    GetCurrentUserUseCase,
    //REPOSITORY
    UserRepository,
    RoleRepository,
    PermissionRepository,
    //UTILS
    EncryptService,
    AuthGuard,
    PermmissionGuard,
  ],
  exports: [],
})
export class UserModule {}
