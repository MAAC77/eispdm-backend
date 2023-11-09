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
import { Usuario } from 'src/core/usuario/entity/usuario.entity'

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

  @Column({ type: 'varchar', comment: 'Hora Marcacion' })
  hora: string

  @Column({ type: 'varchar', comment: 'fecha Marcacion' })
  fecha: string

  @Column({ type: 'varchar', comment: 'Dispositivo Marcacion' })
  dispositivo: string

  @Column({
    name: 'id_usuario',
    type: 'bigint',
    nullable: false,
    comment: 'Clave foránea que referencia la tabla usuarios',
  })
  idUsuario: string

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioMarcacion, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario

  constructor(data?: Partial<Marcacion>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EstadoRegistro.ACTIVO
  }
}
