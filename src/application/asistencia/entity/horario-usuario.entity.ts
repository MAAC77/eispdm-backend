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
import { Usuario } from 'src/core/usuario/entity/usuario.entity'

dotenv.config()

@Check(UtilService.buildStatusCheck(EstadoRegistro))
@Entity({ name: 'horarios_usuarios', schema: process.env.DB_SCHEMA_ASISTENCIA })
export class HorarioUsuario extends AuditoriaEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Clave primaria de la tabla Horario usuarios',
  })
  id: string

  @Column({ length: 100, type: 'varchar', comment: 'Nombre de horario' })
  nombre: string

  @Column({
    name: 'id_horario',
    type: 'uuid',
    nullable: false,
    comment: 'Clave foranea que referencia la tabla de horarios',
  })
  idHorario: string

  @Column({
    name: 'id_usuario',
    type: 'uuid',
    nullable: false,
    comment: 'Clave foranea que referencia la tabla de usuarios',
  })
  idUsuario: string

  @ManyToOne(() => Horario, (horario) => horario.detalles)
  @JoinColumn({ name: 'id_horario', referencedColumnName: 'id' })
  horario: Horario

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioHorario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario

  constructor(data?: Partial<Horario>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EstadoRegistro.ACTIVO
  }
}
