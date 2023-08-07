import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { ERoutesNamePermissions } from '../RoutesPermission';

export const PERMISSION_KEY = 'permission';
export const Permission = (
  permission: ERoutesNamePermissions,
): CustomDecorator<string> => SetMetadata(PERMISSION_KEY, permission);
