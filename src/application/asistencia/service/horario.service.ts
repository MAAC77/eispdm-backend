import { BaseService } from '../../../common/base'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Messages } from '../../../common/constants/response-messages'
import { Status } from '../../../common/constants'
import { PaginacionQueryDto } from '../../../common/dto/paginacion-query.dto'
import { HorarioRepository } from '../repository/horario.repository'
import { CrearHorarioDto } from '../dto/horario.dto'

@Injectable()
export class HorarioService extends BaseService {
  constructor(
    @Inject(HorarioRepository)
    private horarioRepositorio: HorarioRepository
  ) {
    super()
  }

  async listar() {
    return await this.horarioRepositorio.listar()
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.horarioRepositorio.listarTodos(paginacionQueryDto)
  }

  async crear(horarioDto: CrearHorarioDto, usuarioAuditoria: string) {
    return await this.horarioRepositorio.crear(horarioDto, usuarioAuditoria)
  }

  async actualizar(
    id: string,
    horarioDto: CrearHorarioDto,
    usuarioAuditoria: string
  ) {
    const rol = await this.horarioRepositorio.buscarPorId(id)
    if (!rol) {
      throw new NotFoundException(Messages.NO_PERMISSION_FOUND)
    }

    await this.horarioRepositorio.actualizar(id, horarioDto, usuarioAuditoria)
    return { id }
  }

  async activar(idRol: string, usuarioAuditoria: string) {
    const rol = await this.horarioRepositorio.buscarPorId(idRol)
    if (!rol) {
      throw new NotFoundException(Messages.NO_PERMISSION_FOUND)
    }

    const horarioDto = new CrearHorarioDto()
    horarioDto.estado = Status.ACTIVE
    await this.horarioRepositorio.actualizar(
      idRol,
      horarioDto,
      usuarioAuditoria
    )
    return { id: idRol, estado: horarioDto.estado }
  }

  async inactivar(idRol: string, usuarioAuditoria: string) {
    const rol = await this.horarioRepositorio.buscarPorId(idRol)
    if (!rol) {
      throw new NotFoundException(Messages.NO_PERMISSION_FOUND)
    }

    const horarioDto = new CrearHorarioDto()
    horarioDto.estado = Status.INACTIVE
    await this.horarioRepositorio.actualizar(
      idRol,
      horarioDto,
      usuarioAuditoria
    )
    return { id: idRol, estado: horarioDto.estado }
  }
}
