# EISPDM backend - NestJS

<p>
  <a href="./">
    <img src="https://img.shields.io/badge/version-v0.1.0-blue" alt="Versión">
  </a>
  <a href="./LICENSE">
      <img src="https://img.shields.io/static/v1?label=license&message=LPG%20-%20Bolivia&color=green" alt="Licencia: LPG - Bolivia" />
  </a>
</p>

## Tecnologías

- [NestJS](https://nestjs.com/)
- [Jest](https://jestjs.io/)
- [Passport.js](http://www.passportjs.org/)
- [OpenApi](https://www.openapis.org/)
- [TypeORM](https://typeorm.io/)
- [PinoJs](https://getpino.io/#/)
- [Casbin](https://casbin.org/)
- [Postgresql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Funcionalidades

- Autenticación JWT
- Autenticación con Ciudadanía Digital
- Refresh Token
- Autorización (Roles, Módulos, Usuarios, Permisos)
- Paramétricas
- Clientes para Interoperabilidad (SEGIP, SIN)
- Cliente para Mensajería Electrónica
- Proveedores de:
  - Logger
  - Reportes
  - Manejo de errores

## Documentación

Documentación relacionada con el proyecto:

1. [Instalación y Configuración](INSTALL.md)
2. [Arquitectura](/docs/arquitectura.md)
3. [Documentacion de APIS](/docs/openapi.yaml)
4. [Documentacion de Permisos](/docs/permisos.md)

## Comandos útiles

1. Generación de documentación

   ```bash
   $ npm run compodoc
   ```

## Changelog

1. Generar tag y archivo CHANGELOG

   ```bash
   # patch | minor | major
   npm run release -- --release-as patch
   ```

2. Guardar los tags generados

   ```bash
   git push --follow-tags origin main
   ```

## Licencia

[LGP-Bolivia](LICENSE).
