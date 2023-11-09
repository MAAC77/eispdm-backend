import { IsNotEmpty, IsOptional, IsString } from 'src/common/validation'

export class CrearHorarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string

  @IsOptional()
  @IsString()
  descripcion?: string

  estado?: string
}
