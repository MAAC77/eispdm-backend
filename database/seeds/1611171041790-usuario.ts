import { Usuario } from '../../src/core/usuario/entity/usuario.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'
import { TextService } from '../../src/common/lib/text.service'
import {
  Genero,
  TipoDocumento,
  USUARIO_SISTEMA,
} from '../../src/common/constants'
import dayjs from 'dayjs'
import { Persona } from '../../src/core/usuario/entity/persona.entity'

export class usuario1611171041790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        //id: 1,
        usuario: '6995369',
        correoElectonico: '6995369@yopmail.com',
        persona: {
          nombres: 'CRISTHIAN',
          primerApellido: 'MAMANI',
          segundoApellido: 'CHURA',
          tipoDocumento: TipoDocumento.CI,
          nroDocumento: '6995369',
          fechaNacimiento: '1990-12-12',
          genero: Genero.MASCULINO,
        },
      },
      {
        //id: 2,
        usuario: '3394967',
        correoElectonico: '1765251@yopmail.com',
        persona: {
          nombres: ' MARITZA ISABEL',
          primerApellido: 'GISBERT',
          segundoApellido: 'MONZON',
          tipoDocumento: TipoDocumento.CI,
          nroDocumento: '3394967',
          fechaNacimiento: '1990-12-12',
          genero: Genero.FEMENINO,
        },
      },
      {
        //id: 3,
        usuario: '6114767',
        correoElectonico: '6114767@yopmail.com',
        persona: {
          nombres: 'JESUS',
          primerApellido: 'ROJAS',
          segundoApellido: 'ZABALA',
          tipoDocumento: TipoDocumento.CI,
          nroDocumento: '6114767',
          fechaNacimiento: '2009-02-28',
          genero: Genero.MASCULINO,
        },
      },
    ]

    for (const item of items) {
      const persona = new Persona({
        fechaNacimiento: dayjs(
          item.persona.fechaNacimiento,
          'YYYY-MM-DD'
        ).toDate(),
        genero: item.persona.genero,
        nombres: item.persona.nombres,
        nroDocumento: item.persona.nroDocumento,
        primerApellido: item.persona.primerApellido,
        segundoApellido: item.persona.segundoApellido,
        tipoDocumento: item.persona.tipoDocumento,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
      const personaResult = await queryRunner.manager.save(persona)
      const usuario = new Usuario({
        ciudadaniaDigital: false,
        contrasena: await TextService.encrypt(item.usuario),
        intentos: 0,
        usuario: item.usuario,
        correoElectronico: item.correoElectonico,
        idPersona: personaResult.id,
        estado: 'ACTIVO',
        transaccion: 'SEEDS',
        usuarioCreacion: USUARIO_SISTEMA,
      })
      await queryRunner.manager.save(usuario)
    }
  }

  /* eslint-disable */
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
