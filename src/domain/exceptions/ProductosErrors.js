const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class ProductosAlreadyExistsError extends Error {
  constructor() {
    super('Producto ya existe');
    this.name       = 'ProductosAlreadyExistsError';
    this.statusCode = 409;
  }
}

class ProductosInactiveError extends Error {
  constructor() {
    super('Producto se encuentra inactiva');
    this.name       = 'ProductosInactiveError';
    this.statusCode = 403;
  }
}

class ProductosNotFoundError extends Error {
  constructor(id) {
    super(`Producto con id ${id} no encontrada`);
    this.name       = 'ProductosNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  ProductosAlreadyExistsError,
  ProductosInactiveError,
  ProductosNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
