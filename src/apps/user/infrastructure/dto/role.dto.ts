import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ERole } from '../../domain/entity/RoleEntity';

export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'ADMIN',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(ERole)
  @ApiProperty({
    required: true,
    example: ERole.ADMIN,
  })
  code: ERole;

  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    required: true,
    example: ['123e4567-e89b-12d3-a456-426614174001'],
  })
  permissions: string[];
}

export class UpdateRoleDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    example: 'ADMIN',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(ERole)
  @ApiProperty({
    required: false,
    example: 'RL001',
  })
  code?: ERole;

  @IsOptional()
  @IsString({ each: true })
  @ApiProperty({
    required: false,
    example: ['123e4567-e89b-12d3-a456-426614174011'],
  })
  permissions?: string[];
}

export class QueryRoleDTO {
  @IsOptional()
  @IsString()
  @IsEnum(ERole)
  @ApiProperty({
    required: false,
    enum: ERole,
  })
  code?: ERole;
}
