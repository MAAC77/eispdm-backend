export enum ERROR_CODE {
  UNKNOWN_ERROR = 'E01', // error = { name: 'Error' } | new Error()
  HTTP_EXCEPTION = 'E02', // error = new HttpException()

  SERVER_CONEXION = 'E03', // error = { code: 'ECONNREFUSED' }
  SERVER_TIMEOUT = 'E04', // response = { data: "The upstream server is timing out" }
  SERVER_CERT_EXPIRED = 'E05', // error = { code: 'CERT_HAS_EXPIRED' }

  SQL_ERROR = 'E06', // error = { name: "QueryFailedError" }
  AXIOS_ERROR = 'E07', // error = axios().catch(err => ...)

  SERVER_ERROR_1 = 'E08', // body = { message: "detalle del error" }
  SERVER_ERROR_2 = 'E09', // body = { data: "detalle del error" }

  EMPTY_ERROR = 'E10', // error = undefined | null | ''
  STRING_ERROR = 'E11', // error = 'BOOM'
}

export enum ERROR_NAME {
  E01 = 'ERROR NO CONTROLADO',
  E02 = 'ERROR CONTROLADO',

  E03 = 'ERROR DE CONEXIÓN CON SERVICIO EXTERNO',
  E04 = 'ERROR DE TIMEOUT CON SERVICIO EXTERNO',
  E05 = 'ERROR DE CERTIFICADO CON SERVICIO EXTERNO',

  E06 = 'ERROR DE CONSULTA CON BASE DE DATOS',
  E07 = 'ERROR DE CONSULTA CON SERVICIO EXTERNO',

  E08 = 'ERROR DESCONOCIDO CON SERVICIO EXTERNO (message)',
  E09 = 'ERROR DESCONOCIDO CON SERVICIO EXTERNO (data)',

  E10 = 'ERROR DESCONOCIDO (undefined)',
  E11 = 'ERROR DESCONOCIDO (string)',
}
