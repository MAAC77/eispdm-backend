import { Module } from '@nestjs/common'
import { ParametricasModule } from './parametricas/parametricas.module'
import { AsistenciaModule } from './asistencia/asistencia.module'

@Module({
  imports: [ParametricasModule, AsistenciaModule],
})
export class ApplicationModule {}
