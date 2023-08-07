import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Permission } from 'src/shared/decorators/routes-permission.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { PermmissionGuard } from 'src/shared/guard/permission.guard';
import { ERoutesNamePermissions } from 'src/shared/RoutesPermission';

import { UserCreatorUseCase } from '../../application/user/UserCreator';
import { UserGetByIdUseCase } from '../../application/user/UserGetById';
import { UserGetQueryUseCase } from '../../application/user/UserGetQuery';
import { UserRemoverUseCase } from '../../application/user/UserRemover';
import { UserUpdaterUseCase } from '../../application/user/UserUpdater';
import { UserEntity } from '../../domain/entity/UserEntity';
import { CreateUserDto, QueryUserDTO, UpdateUserDTO } from '../dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(
    private readonly userGetQueryUseCase: UserGetQueryUseCase,
    private readonly userUpdaterUseCase: UserUpdaterUseCase,
    private readonly userRemoverUseCase: UserRemoverUseCase,
    private readonly userGetOneUseCase: UserGetByIdUseCase,
    private readonly userCreatorUseCase: UserCreatorUseCase,
  ) {}

  @Permission(ERoutesNamePermissions.USER_CREATE)
  @UseGuards(PermmissionGuard)
  @Post('/')
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    return this.userCreatorUseCase.execute(data);
  }

  @Permission(ERoutesNamePermissions.USER_FIND)
  @UseGuards(PermmissionGuard)
  @Get('/')
  async getByQuery(@Query() query: QueryUserDTO): Promise<UserEntity[]> {
    return this.userGetQueryUseCase.execute(query);
  }

  @Permission(ERoutesNamePermissions.USER_FIND_ONE)
  @UseGuards(PermmissionGuard)
  @Get('/:id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return this.userGetOneUseCase.execute(id);
  }

  @Permission(ERoutesNamePermissions.USER_UPDATE)
  @UseGuards(PermmissionGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDTO,
  ): Promise<void> {
    return this.userUpdaterUseCase.execute({ id, data });
  }

  @Permission(ERoutesNamePermissions.USER_DELETE)
  @UseGuards(PermmissionGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.userRemoverUseCase.execute(id);
  }
}
