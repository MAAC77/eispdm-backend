import { UtilService } from '../../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { EstadoRegistro } from '../../../common/constants'
import { HorarioDetalle } from './horario-detalle.entity'

dotenv.config()

@Check(UtilService.buildStatusCheck(EstadoRegistro))
@Entity({ name: 'horarios', schema: process.env.DB_SCHEMA_ASISTENCIA })
export class Horario extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Clave primaria de la tabla Horario',
  })
  id: string

  @Column({ length: 100, type: 'varchar', comment: 'Nombre de horario' })
  nombre: string

  @Column({
    length: 250,
    type: 'varchar',
    comment: 'Descripcion de horario',
    nullable: true,
  })
  descripcion?: string

  @OneToMany(() => HorarioDetalle, (horarioDetalle) => horarioDetalle.horario)
  detalles: HorarioDetalle[]

  constructor(data?: Partial<Horario>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EstadoRegistro.ACTIVO
  }
}
