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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleCreatorUseCase } from '../../application/role/RoleCreator';
import { RoleDeleteUseCase } from '../../application/role/RoleDelete';
import { RoleGetOneUseCase } from '../../application/role/RoleGetById';
import { RoleGetQueryUseCase } from '../../application/role/RoleGetQuery';
import { RoleUpdateUseCase } from '../../application/role/RoleUpdate';
import { RoleEntity } from '../../domain/entity/RoleEntity';
import { CreateRoleDTO, QueryRoleDTO, UpdateRoleDTO } from '../dto/role.dto';

@ApiTags('Role')
@Controller('/role')
export class RoleController {
  constructor(
    private readonly roleCreatorUseCase: RoleCreatorUseCase,
    private readonly roleUpdateUseCase: RoleUpdateUseCase,
    private readonly roleGetOneUseCase: RoleGetOneUseCase,
    private readonly roleGetQueryUseCase: RoleGetQueryUseCase,
    private readonly roleDeleteUseCase: RoleDeleteUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: CreateRoleDTO): Promise<void> {
    return this.roleCreatorUseCase.execute(data);
  }
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getOne(@Param('id') id: string): Promise<RoleEntity> {
    return this.roleGetOneUseCase.execute(id);
  }
  @Get('/')
  async getQuery(@Query() query: QueryRoleDTO): Promise<RoleEntity[]> {
    return this.roleGetQueryUseCase.execute(query);
  }
  @Patch('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateById(
    @Body() values: UpdateRoleDTO,
    @Param('id') id: string,
  ): Promise<void> {
    return this.roleUpdateUseCase.execute({ id, values });
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Éxito' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.roleDeleteUseCase.execute(id);
  }
}
