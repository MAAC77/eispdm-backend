import { DataSource, EntityManager } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { HorarioDetalle } from '../entity/horario-detalle.entity'
import { CrearHorarioDetalleDto } from '../dto/horario.dto'
import { BaseRepository } from 'src/common/base/base-repository'
import { EstadoRegistro } from 'src/common/constants'

@Injectable()
export class HorarioDetalleRepository extends BaseRepository<HorarioDetalle> {
  constructor(protected dataSource: DataSource) {
    super(HorarioDetalleRepository.name, dataSource, HorarioDetalle)
  }

  async buscarPorId(id: string) {
    return await this._buscarRegistro({ where: { id } })
  }

  async crear(
    detalle: CrearHorarioDetalleDto,
    usuarioAuditoria: string,
    transaction: EntityManager
  ) {
    return await this._crearRegistro(
      {
        ...detalle,
        lunes: detalle.dias.includes('lunes'),
        martes: detalle.dias.includes('martes'),
        miercoles: detalle.dias.includes('miercoles'),
        jueves: detalle.dias.includes('jueves'),
        viernes: detalle.dias.includes('viernes'),
        usuarioCreacion: usuarioAuditoria,
        estado: EstadoRegistro.ACTIVO,
      },
      transaction
    )
  }

  async listar(idHorario: string) {
    return await this.dataSource
      .getRepository(HorarioDetalle)
      .createQueryBuilder('detalle')
      .select([
        'detalle.id',
        'detalle.horaEntrada',
        'detalle.horaSalida',
        'detalle.entradaMaxima',
        'detalle.entradaMinima',
        'detalle.salidaMaxima',
        'detalle.salidaMinima',
        'detalle.lunes',
        'detalle.martes',
        'detalle.miercoles',
        'detalle.jueves',
        'detalle.viernes',
      ])
      .where({ idHorario })
      .getMany()
  }
}
