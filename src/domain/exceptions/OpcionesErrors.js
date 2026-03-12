const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class OpcionesAlreadyExistsError extends Error {
  constructor() {
    super('La Opcion ya existe');
    this.name       = 'OpcionesAlreadyExistsError';
    this.statusCode = 409;
  }
}

class OpcionesInactiveError extends Error {
  constructor() {
    super('Opcion se encuentra inactiva');
    this.name       = 'OpcionesInactiveError';
    this.statusCode = 403;
  }
}

class OpcionesNotFoundError extends Error {
  constructor(id) {
    super(`Opcion con id ${id} no encontrada`);
    this.name       = 'OpcionesNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  OpcionesAlreadyExistsError,
  OpcionesInactiveError,
  OpcionesNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
