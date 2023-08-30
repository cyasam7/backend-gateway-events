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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Permission } from 'src/shared/decorators/routes-permission.decorator';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { PermmissionGuard } from 'src/shared/guard/permission.guard';
import { ERoutesNamePermissions } from 'src/shared/RoutesPermission';

import { RoleCreatorUseCase } from '../../application/role/RoleCreator';
import { RoleDeleteUseCase } from '../../application/role/RoleDelete';
import { RoleGetOneUseCase } from '../../application/role/RoleGetById';
import { RoleGetQueryUseCase } from '../../application/role/RoleGetQuery';
import { RoleUpdateUseCase } from '../../application/role/RoleUpdate';
import { RoleEntity } from '../../domain/entity/RoleEntity';
import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from '../dto/role.dto';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/role')
export class RoleController {
  constructor(
    private readonly roleCreatorUseCase: RoleCreatorUseCase,
    private readonly roleUpdateUseCase: RoleUpdateUseCase,
    private readonly roleGetOneUseCase: RoleGetOneUseCase,
    private readonly roleGetQueryUseCase: RoleGetQueryUseCase,
    private readonly roleDeleteUseCase: RoleDeleteUseCase,
  ) {}

  @Permission(ERoutesNamePermissions.ROLE_CREATE)
  @UseGuards(PermmissionGuard)
  @Post('/')
  async create(@Body() data: CreateRoleDTO): Promise<void> {
    return this.roleCreatorUseCase.execute(data);
  }

  @Permission(ERoutesNamePermissions.ROLE_FIND)
  @UseGuards(PermmissionGuard)
  @Get('/')
  async getQuery(@Query() query: QueryRoleDTO): Promise<RoleEntity[]> {
    return this.roleGetQueryUseCase.execute(query);
  }

  @Permission(ERoutesNamePermissions.ROLE_FIND_ONE)
  @UseGuards(PermmissionGuard)
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async getOne(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleGetOneUseCase.execute(id);
  }

  @Permission(ERoutesNamePermissions.ROLE_UPDATE)
  @UseGuards(PermmissionGuard)
  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async updateById(
    @Body() values: UpdateRoleDTO,
    @Param('id') id: string,
  ): Promise<void> {
    return this.roleUpdateUseCase.execute({ id, values });
  }

  @Permission(ERoutesNamePermissions.ROLE_DELETE)
  @UseGuards(PermmissionGuard)
  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.roleDeleteUseCase.execute(id);
  }
}
