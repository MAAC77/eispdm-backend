import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'src/common/validation'

export class CrearHorarioDto {
  @IsNotEmpty()
  @IsString()
  nombre: string

  @IsOptional()
  @IsString()
  descripcion?: string

  estado?: string
}

export class CrearHorarioDetalleDto {
  @IsNotEmpty()
  @IsString()
  horaEntrada: string

  @IsNotEmpty()
  @IsString()
  horaSalida: string

  @IsNotEmpty()
  @IsString()
  entradaMaxima: string

  @IsNotEmpty()
  @IsString()
  entradaMinima: string

  @IsNotEmpty()
  @IsString()
  salidaMaxima: string

  @IsNotEmpty()
  @IsString()
  salidaMinima: string

  @IsNotEmpty()
  @IsArray()
  dias: string[]

  @IsNotEmpty()
  @IsString()
  // @IsUUID()
  idHorario: string
}
