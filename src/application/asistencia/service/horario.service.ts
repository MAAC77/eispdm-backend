import { BaseService } from '../../../common/base'
import {
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common'
import { Messages } from '../../../common/constants/response-messages'
import { Status } from '../../../common/constants'
import { PaginacionQueryDto } from '../../../common/dto/paginacion-query.dto'
import { HorarioRepository } from '../repository/horario.repository'
import { CrearHorarioDetalleDto, CrearHorarioDto } from '../dto/horario.dto'
import { EntityManager } from 'typeorm'
import { HorarioDetalleRepository } from '../repository/horario-detalle.repository'
import dayjs from 'dayjs'

@Injectable()
export class HorarioService extends BaseService {
  constructor(
    @Inject(HorarioRepository)
    private horarioRepositorio: HorarioRepository,
    @Inject(HorarioDetalleRepository)
    private horarioDetalleRepositorio: HorarioDetalleRepository
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

  async crearDetalle(
    detalle: CrearHorarioDetalleDto,
    usuarioAuditoria: string,
    transaction?: EntityManager
  ) {
    if (!transaction) {
      const op = async (transaction: EntityManager) => {
        return await this.crearDetalle(detalle, usuarioAuditoria, transaction)
      }
      return await this.runTransaction(op)
    }
    const horarioResult = await this.horarioRepositorio.buscarPorId(
      detalle.idHorario
    )

    if (!horarioResult) {
      throw new PreconditionFailedException('Horario no encontrado')
    }
    return await this.horarioDetalleRepositorio.crear(
      {
        ...detalle,
        horaEntrada: dayjs(detalle.horaEntrada).format('HH:mm'),
        horaSalida: dayjs(detalle.horaSalida).format('HH:mm'),
        entradaMaxima: dayjs(detalle.entradaMaxima).format('HH:mm'),
        entradaMinima: dayjs(detalle.entradaMinima).format('HH:mm'),
        salidaMaxima: dayjs(detalle.salidaMaxima).format('HH:mm'),
        salidaMinima: dayjs(detalle.salidaMinima).format('HH:mm'),
      },
      usuarioAuditoria,
      transaction
    )
  }

  async listarDetalleHorario(id: string) {
    return await this.horarioDetalleRepositorio.listar(id)
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
  async runTransaction<T>(op: (entityManager: EntityManager) => Promise<T>) {
    return await this.horarioDetalleRepositorio.runTransaction<T>(op)
  }
}
