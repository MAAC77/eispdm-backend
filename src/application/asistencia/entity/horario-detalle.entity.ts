import { UtilService } from '../../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../../common/entity/auditoria.entity'
import { EstadoRegistro } from '../../../common/constants'
import { Horario } from './horario.entity'

dotenv.config()

@Check(UtilService.buildStatusCheck(EstadoRegistro))
@Entity({ name: 'horario_detalles', schema: process.env.DB_SCHEMA_ASISTENCIA })
export class HorarioDetalle extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Clave primaria de la tabla Horario detalle',
  })
  id: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de entrada' })
  horaEntrada: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de salida' })
  horaSalida: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de entrada maxima' })
  entradaMaxima: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de entrada minima' })
  entradaMinima: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de salida maxima' })
  salidaMaxima: string

  @Column({ length: 5, type: 'varchar', comment: 'Hora de salida minima' })
  salidaMinima: string

  @Column({ type: 'boolean', comment: 'Aplica lunes' })
  lunes: boolean

  @Column({ type: 'boolean', comment: 'Aplica martes' })
  martes: boolean

  @Column({ type: 'boolean', comment: 'Aplica miercoles' })
  miercoles: boolean

  @Column({ type: 'boolean', comment: 'Aplica jueves' })
  jueves: boolean

  @Column({ type: 'boolean', comment: 'Aplica viernes' })
  viernes: boolean

  @Column({
    name: 'id_horario',
    type: 'uuid',
    nullable: false,
    comment: 'Clave foranea que referencia la tabla de horarios',
  })
  idHorario: string

  @ManyToOne(() => Horario, (horario) => horario.detalles)
  @JoinColumn({ name: 'id_horario', referencedColumnName: 'id' })
  horario: Horario

  constructor(data?: Partial<Horario>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EstadoRegistro.ACTIVO
  }
}
