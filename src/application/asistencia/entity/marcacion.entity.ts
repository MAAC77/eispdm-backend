import { UtilService } from '../../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { EstadoRegistro } from '../../../common/constants'

dotenv.config()

@Check(UtilService.buildStatusCheck(EstadoRegistro))
@Entity({ name: 'marcaciones', schema: process.env.DB_SCHEMA_ASISTENCIA })
export class Marcacion extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
    comment: 'Clave primaria de la tabla Registros',
  })
  id: string

  @Column({
    name: 'id_registro',
    type: 'varchar',
    comment: 'Id usaurio en el dispositivo',
  })
  idRegistro: string

  @Column({
    name: 'id_usuario_dispositivo',
    type: 'varchar',
    comment: 'Id usaurio en el dispositivo',
  })
  idUsuarioDispositivo: string

  @Column({ type: 'varchar', comment: 'fecha Marcacion' })
  fecha: Date

  @Column({
    name: 'ip_dispositivo',
    type: 'varchar',
    comment: 'Dispositivo Marcacion',
  })
  ipDispositivo: string

  constructor(data?: Partial<Marcacion>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EstadoRegistro.ACTIVO
  }
}
