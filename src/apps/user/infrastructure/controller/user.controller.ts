import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserCreatorUseCase } from '../../application/user/UserCreator';
import { UserGetOneUseCase } from '../../application/user/UserGetById';
import { UserGetQueryUseCase } from '../../application/user/UserGetQuery';
import { UserRemoverUseCase } from '../../application/user/UserRemover';
import { UserUpdaterUseCase } from '../../application/user/UserUpdater';
import { UserEntity } from '../../domain/entity/UserEntity';
import { CreateUserDto, QueryUserDTO, UpdateUserDTO } from '../dto/user.dto';

@ApiTags('User')
@Controller('/users')
export class UserController {
  constructor(
    private readonly userGetQueryUseCase: UserGetQueryUseCase,
    private readonly userUpdaterUseCase: UserUpdaterUseCase,
    private readonly userRemoverUseCase: UserRemoverUseCase,
    private readonly userGetOneUseCase: UserGetOneUseCase,
    private readonly userCreatorUseCase: UserCreatorUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return this.userCreatorUseCase.execute(data);
  }

  @Get('/')
  async getByQuery(@Query() query: QueryUserDTO): Promise<UserEntity[]> {
    return this.userGetQueryUseCase.execute(query);
  }
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return this.userGetOneUseCase.execute(id);
  }
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userRemoverUseCase.execute(id);
  }
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<void> {
    return this.userUpdaterUseCase.execute({ id, data });
  }
}
