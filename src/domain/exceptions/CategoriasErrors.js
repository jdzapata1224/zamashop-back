const { NotImplementedError, EmptyResultError } = require('./BaseErrors');

class CategoriasAlreadyExistsError extends Error {
  constructor() {
    super('La Categoria ya existe');
    this.name       = 'CategoriasAlreadyExistsError';
    this.statusCode = 409;
  }
}

class CategoriasInactiveError extends Error {
  constructor() {
    super('Categoria se encuentra inactiva');
    this.name       = 'CategoriasInactiveError';
    this.statusCode = 403;
  }
}

class CategoriaNotFoundError extends Error {
  constructor(id) {
    super(`Categoria con id ${id} no encontrada`);
    this.name       = 'CategoriaNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  CategoriasAlreadyExistsError,
  CategoriasInactiveError,
  CategoriaNotFoundError,
  EmptyResultError,
  NotImplementedError,
};
