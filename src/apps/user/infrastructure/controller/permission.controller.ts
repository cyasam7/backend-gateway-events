import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

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
@Controller('/permission')
export class PermissionController {
  constructor(
    private readonly permissionCreatorUseCase: PermissionCreatorUseCase,
    private readonly permissionUpdateUseCase: PermissionUpdateUseCase,
    private readonly permissionGetOneUseCase: PermissionGetOneUseCase,
    private readonly permissionGetQueryUseCase: PermissionGetQueryUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: CreatePermissionDTO): Promise<void> {
    return this.permissionCreatorUseCase.execute(data);
  }

  @Get('/')
  async getQuery(
    @Query() query: QueryPermissionDTO,
  ): Promise<PermissionEntity[]> {
    return this.permissionGetQueryUseCase.execute(query);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getOne(@Param('id') id: string): Promise<PermissionEntity> {
    return this.permissionGetOneUseCase.execute(id);
  }

  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateById(
    @Body() values: UpdatePermissionDTO,
    @Param('id') id: string,
  ): Promise<void> {
    return this.permissionUpdateUseCase.execute({ id, values });
  }
}
