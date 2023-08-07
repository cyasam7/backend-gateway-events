import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from 'src/apps/user/domain/entity/UserEntity';

import { PERMISSION_KEY } from '../decorators/routes-permission.decorator';
import { ERoutesNamePermissions } from '../RoutesPermission';

@Injectable()
export class PermmissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissionRequired =
      this.reflector.getAllAndOverride<ERoutesNamePermissions>(PERMISSION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    const { user } = context.switchToHttp().getRequest() as {
      user: UserEntity;
    };

    const isUserValidPermission = user.role.permissions.some((i) =>
      i.permissions.includes(permissionRequired),
    );

    return isUserValidPermission;
  }
}
