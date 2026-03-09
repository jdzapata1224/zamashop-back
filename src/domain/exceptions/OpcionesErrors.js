class OpcionesAlreadyExistsError extends Error {
  constructor() {
    super('La Opcion ya existe');
    this.name       = 'OpcionesAlreadyExistsError';
    this.statusCode = 409;
  }
}


class OpcionesInactiveError extends Error {
  constructor() {
    super('Opcion se encuentra inactivo');
    this.name       = 'OpcionesInactiveError';
    this.statusCode = 403;
  }
}

class OpcionesNotFoundError extends Error {
  constructor(id) {
    super(`Opcion con id ${id} no encontrado`);
    this.name       = 'OpcionesNotFoundError';
    this.statusCode = 404;
  }
}

class OpcionesEmptyError extends Error {
  constructor(id) {
    super(`No hay informacion para mostrar`);
    this.name       = 'OpcionesEmptyError';
    this.statusCode = 404;
  }
}

class NotImplementedError extends Error {
  constructor() {
    super('Método no implementado');
    this.name       = 'NotImplementedError';
    this.statusCode = 501;
  }
}

module.exports = {
  OpcionesEmptyError,
  OpcionesAlreadyExistsError,
  OpcionesInactiveError,
  OpcionesNotFoundError,
  NotImplementedError,
};