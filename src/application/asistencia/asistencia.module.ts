import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HorarioController } from './controller/horario.controller'
import { HorarioService } from './service/horario.service'
import { HorarioRepository } from './repository/horario.repository'
import { Horario } from './entity/horario.entity'
import { HorarioUsuario } from './entity/horario-usuario.entity'
import { HorarioDetalle } from './entity/horario-detalle.entity'
import { Marcacion } from './entity/marcacion.entity'
import { HorarioDetalleRepository } from './repository/horario-detalle.repository'

@Module({
  controllers: [HorarioController],
  providers: [HorarioService, HorarioRepository, HorarioDetalleRepository],
  imports: [
    TypeOrmModule.forFeature([
      Horario,
      HorarioUsuario,
      HorarioDetalle,
      Marcacion,
    ]),
  ],
})
export class AsistenciaModule {}
