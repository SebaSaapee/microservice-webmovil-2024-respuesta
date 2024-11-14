export enum RabbitMQ {
  RespuestaQueue = 'respuestas',
}

export enum RespuestaMsg {
  CREATE = 'CREATE_RESPUESTA',
  FIND_ALL = 'FIND_RESPUESTAS',
  FIND_ONE = 'FIND_RESPUESTA',
  UPDATE = 'UPDATE_RESPUESTA',
  DELETE = 'DELETE_RESPUESTA',
  FIND_BY_USER = 'FIND_RESPUESTA_USER',
}