const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class PerfilesAlreadyExistsError extends Error {
  constructor() {
    super('Perfil ya existe');
    this.name       = 'PerfilesAlreadyExistsError';
    this.statusCode = 409;
  }
}

class PerfilesInactiveError extends Error {
  constructor() {
    super('Perfil se encuentra inactiva');
    this.name       = 'PerfilesInactiveError';
    this.statusCode = 403;
  }
}

class PerfilesNotFoundError extends Error {
  constructor(id) {
    super(`Perfil con id ${id} no encontrada`);
    this.name       = 'PerfilesNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  PerfilesAlreadyExistsError,
  PerfilesInactiveError,
  PerfilesNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
