import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import {
  BaseEntity,
  DataSource,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm'
import { LoggerService } from 'src/core/logger'
import { Transaccion } from '../constants'

export class BaseRepository<E extends BaseEntity> {
  protected context = 'BASE'
  protected dataSource: DataSource
  protected entityTarget: EntityTarget<E>
  protected logger = LoggerService.getInstance()

  constructor(
    context: string,
    dataSource: DataSource,
    entityTarget: EntityTarget<E>
  ) {
    this.context = context
    this.dataSource = dataSource
    this.entityTarget = entityTarget
  }

  protected _obtenerRepositorio(transaction?: EntityManager): Repository<E> {
    const repo = transaction
      ? transaction.getRepository(this.entityTarget)
      : this.dataSource.getRepository(this.entityTarget)
    return repo
  }

  protected async _crearRegistro(
    datosCrear: QueryDeepPartialEntity<E>,
    transaction?: EntityManager
  ): Promise<{ id: string }> {
    const repo = this._obtenerRepositorio(transaction)
    const insertResult = await repo.insert({
      ...datosCrear,
      transaccion: Transaccion.CREAR,
    })
    const idRegistro: string = insertResult.identifiers[0].id
    return { id: idRegistro }
  }

  protected async _buscarRegistro(
    consulta: FindOneOptions<E>,
    transaction?: EntityManager
  ): Promise<E | null> {
    const repo = this._obtenerRepositorio(transaction)
    return await repo.findOne(consulta)
  }

  protected async _actualizarRegistro(
    criterio: FindOptionsWhere<E>,
    datosActualizar: QueryDeepPartialEntity<E>,
    transaction?: EntityManager
  ): Promise<void> {
    const repo = this._obtenerRepositorio(transaction)
    await repo.update(criterio, datosActualizar)
  }

  protected async _eliminarRegistro(
    criterio: FindOptionsWhere<E>,
    transaction?: EntityManager
  ): Promise<void> {
    const repo = this._obtenerRepositorio(transaction)
    await repo.delete(criterio)
  }

  async runTransaction<E>(op: (entityManager: EntityManager) => Promise<E>) {
    return this.dataSource.transaction<E>(op)
  }
}
