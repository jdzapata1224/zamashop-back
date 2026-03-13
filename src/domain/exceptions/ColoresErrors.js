const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class ColoresAlreadyExistsError extends Error {
  constructor() {
    super('Color ya existe');
    this.name       = 'ColoresAlreadyExistsError';
    this.statusCode = 409;
  }
}

class ColoresInactiveError extends Error {
  constructor() {
    super('Color se encuentra inactiva');
    this.name       = 'ColoresInactiveError';
    this.statusCode = 403;
  }
}

class ColoresNotFoundError extends Error {
  constructor(id) {
    super(`Color con id ${id} no encontrada`);
    this.name       = 'ColoresNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  ColoresAlreadyExistsError,
  ColoresInactiveError,
  ColoresNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
