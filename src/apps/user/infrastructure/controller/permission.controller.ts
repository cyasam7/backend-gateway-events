import {
  Body,
  Controller,
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

import { PermissionGetOneUseCase } from '../../application/permissions/PermissionGetById';
import { PermissionGetQueryUseCase } from '../../application/permissions/PermissionGetQuery';
import { PermissionCreatorUseCase } from '../../application/permissions/PermissionsCreator';
import { PermissionUpdateUseCase } from '../../application/permissions/PermissionUpdate';
import { PermissionEntity } from '../../domain/entity/PermissionsEntity';
import {
  CreatePermissionDTO,
  QueryPermissionDTO,
  UpdatePermissionDTO,
} from '../dto/permission.dto';

@ApiTags('Permission')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/permission')
export class PermissionController {
  constructor(
    private readonly permissionCreatorUseCase: PermissionCreatorUseCase,
    private readonly permissionUpdateUseCase: PermissionUpdateUseCase,
    private readonly permissionGetOneUseCase: PermissionGetOneUseCase,
    private readonly permissionGetQueryUseCase: PermissionGetQueryUseCase,
  ) {}

  @Permission(ERoutesNamePermissions.PERMISSION_CREATE)
  @UseGuards(PermmissionGuard)
  @Post('/')
  async create(@Body() data: CreatePermissionDTO): Promise<void> {
    return this.permissionCreatorUseCase.execute(data);
  }

  @Permission(ERoutesNamePermissions.PERMISSION_FIND)
  @UseGuards(PermmissionGuard)
  @Get('/')
  async getQuery(
    @Query() query: QueryPermissionDTO,
  ): Promise<PermissionEntity[]> {
    return this.permissionGetQueryUseCase.execute(query);
  }

  @Permission(ERoutesNamePermissions.PERMISSION_FIND_ONE)
  @UseGuards(PermmissionGuard)
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async getOne(@Param('id') id: string): Promise<PermissionEntity> {
    return this.permissionGetOneUseCase.execute(id);
  }

  @Permission(ERoutesNamePermissions.PERMISSION_UPDATE)
  @UseGuards(PermmissionGuard)
  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  async updateById(
    @Body() values: UpdatePermissionDTO,
    @Param('id') id: string,
  ): Promise<void> {
    return this.permissionUpdateUseCase.execute({ id, values });
  }
}
