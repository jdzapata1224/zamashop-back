const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class ProductoVariacionAlreadyExistsError extends Error {
  constructor() {
    super('La Opcion ya existe');
    this.name       = 'ProductoVariacionAlreadyExistsError';
    this.statusCode = 409;
  }
}

class ProductoVariacionInactiveError extends Error {
  constructor() {
    super('Opcion se encuentra inactiva');
    this.name       = 'ProductoVariacionInactiveError';
    this.statusCode = 403;
  }
}

class ProductoVariacionNotFoundError extends Error {
  constructor(id) {
    super(`Opcion con id ${id} no encontrada`);
    this.name       = 'ProductoVariacionNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  ProductoVariacionAlreadyExistsError,
  ProductoVariacionInactiveError,
  ProductoVariacionNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
