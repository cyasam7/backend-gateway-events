import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

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
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Cyasam86&',
  })
  password: string;
}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    example: 'cyasam7@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Cyasam86&',
  })
  password: string;
}
