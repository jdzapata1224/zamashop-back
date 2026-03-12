class NotImplementedError extends Error {
  constructor() {
    super('Método no implementado');
    this.name       = 'NotImplementedError';
    this.statusCode = 501;
  }
}

class EmptyResultError extends Error {
  constructor() {
    super('No hay información para mostrar');
    this.name       = 'EmptyResultError';
    this.statusCode = 404;
  }
}

module.exports = { NotImplementedError, EmptyResultError };
