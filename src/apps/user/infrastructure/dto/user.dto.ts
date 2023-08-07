import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

import { ERole } from '../../domain/entity/RoleEntity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Alexander Serrano',
  })
  name: string;

  @IsNumberString()
  @IsPhoneNumber('MX')
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: '6183240572',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'cyasam7@gmail.com',
  })
  email: string;

  @IsString()
  @IsEnum(ERole)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: ERole.ADMIN,
    enum: ERole,
  })
  role: ERole;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Cyasam86&',
  })
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDto) {}

export class QueryUserDTO {
  @IsString()
  @IsEnum(ERole)
  @IsOptional()
  @ApiProperty({
    required: false,
    example: ERole.ADMIN,
    enum: ERole,
  })
  role: ERole;
}
