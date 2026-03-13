const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class TallasAlreadyExistsError extends Error {
  constructor() {
    super('Talla ya existe');
    this.name       = 'TallasAlreadyExistsError';
    this.statusCode = 409;
  }
}

class TallasInactiveError extends Error {
  constructor() {
    super('Talla se encuentra inactiva');
    this.name       = 'TallasInactiveError';
    this.statusCode = 403;
  }
}

class TallasNotFoundError extends Error {
  constructor(id) {
    super(`Talla con id ${id} no encontrada`);
    this.name       = 'TallasNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  TallasAlreadyExistsError,
  TallasInactiveError,
  TallasNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
