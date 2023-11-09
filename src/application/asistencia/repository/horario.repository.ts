import { Brackets, DataSource } from 'typeorm'
import { Status } from '../../../common/constants'
import { Injectable } from '@nestjs/common'
import { Horario } from '../entity/horario.entity'
import { CrearHorarioDto } from '../dto/horario.dto'
import { PaginacionQueryDto } from 'src/common/dto/paginacion-query.dto'

@Injectable()
export class HorarioRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Horario)
      .createQueryBuilder('horario')
      .where({ id })
      .getOne()
  }

  async listar() {
    return await this.dataSource
      .getRepository(Horario)
      .createQueryBuilder('horario')
      .select(['horario.id', 'horario.nombre', 'horario.estado'])
      .where({ estado: Status.ACTIVE })
      .getMany()
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Horario)
      .createQueryBuilder('horario')
      .select([
        'horario.id',
        'horario.nombre',
        'horario.descripcion',
        'horario.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'nombre':
        query.addOrderBy('horario.nombre', sentido)
        break
      case 'descripcion':
        query.addOrderBy('horario.estado', sentido)
        break
      default:
        query.addOrderBy('horario.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('horario.nombre ilike :filtro', { filtro: `%${filtro}%` })
          qb.orWhere('horario.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async crear(horario: CrearHorarioDto, usuarioAuditoria: string) {
    return await this.dataSource
      .getRepository(Horario)
      .save(new Horario({ ...horario, usuarioCreacion: usuarioAuditoria }))
  }

  async actualizar(
    id: string,
    horario: CrearHorarioDto,
    usuarioAuditoria: string
  ) {
    const datosActualizar = new Horario({
      ...horario,
      usuarioModificacion: usuarioAuditoria,
    })
    return await this.dataSource
      .getRepository(Horario)
      .update(id, datosActualizar)
  }
}
