class UserAlreadyExistsError extends Error {
  constructor() {
    super('El usuario o identificación ya existe');
    this.name       = 'UserAlreadyExistsError';
    this.statusCode = 409;
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciales inválidas');
    this.name       = 'InvalidCredentialsError';
    this.statusCode = 401;
  }
}

class UserInactiveError extends Error {
  constructor() {
    super('El usuario se encuentra inactivo');
    this.name       = 'UserInactiveError';
    this.statusCode = 403;
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('Usuario no encontrado');
    this.name       = 'UserNotFoundError';
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
  UserAlreadyExistsError,
  InvalidCredentialsError,
  UserInactiveError,
  UserNotFoundError,
  NotImplementedError,
};