import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ERoutesNamePermissions } from '../../../../shared/RoutesPermission';

export class CreatePermissionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Permission',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: '/permission',
  })
  route: string;

  @IsNotEmpty()
  @IsEnum(ERoutesNamePermissions, { each: true })
  @ApiProperty({
    required: true,
    example: [
      ERoutesNamePermissions.AUTH_LOGIN,
      ERoutesNamePermissions.PERMISSION_CREATE,
    ],
  })
  permissions: string[];
}

export class UpdatePermissionDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Permission',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: '/permission',
  })
  route: string;

  @IsNotEmpty()
  @IsEnum(ERoutesNamePermissions, { each: true })
  @ApiProperty({
    required: true,
    example: [
      ERoutesNamePermissions.AUTH_LOGIN,
      ERoutesNamePermissions.PERMISSION_CREATE,
    ],
  })
  permissions: string[];
}

export class QueryPermissionDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  route?: string;
}
