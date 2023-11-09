import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { BaseController } from '../../../common/base'
import { ParamIdDto } from '../../../common/dto/params-id.dto'
import { PaginacionQueryDto } from '../../../common/dto/paginacion-query.dto'
import { Request } from 'express'
import { HorarioService } from '../service/horario.service'
import { JwtAuthGuard } from 'src/core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from 'src/core/authorization/guards/casbin.guard'
import { CrearHorarioDto } from '../dto/horario.dto'

@UseGuards(JwtAuthGuard, CasbinGuard)
@Controller('horario')
export class HorarioController extends BaseController {
  constructor(private horarioServicio: HorarioService) {
    super()
  }

  @Get()
  async listar() {
    const result = await this.horarioServicio.listar()
    return this.successList(result)
  }

  @Get('todos')
  async listarTodos(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.horarioServicio.listarTodos(paginacionQueryDto)
    return this.successListRows(result)
  }

  @Post()
  async crear(@Req() req: Request, @Body() rolDto: CrearHorarioDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.horarioServicio.crear(rolDto, usuarioAuditoria)
    return this.successCreate(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() params: ParamIdDto,
    @Req() req: Request,
    @Body() rolDto: CrearHorarioDto
  ) {
    const { id: idRol } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.horarioServicio.actualizar(
      idRol,
      rolDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req: Request, @Param() params: ParamIdDto) {
    const { id: idRol } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.horarioServicio.activar(idRol, usuarioAuditoria)
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req: Request, @Param() params: ParamIdDto) {
    const { id: idRol } = params
    const usuarioAuditoria = this.getUser(req)
    const result = await this.horarioServicio.inactivar(idRol, usuarioAuditoria)
    return this.successUpdate(result)
  }
}