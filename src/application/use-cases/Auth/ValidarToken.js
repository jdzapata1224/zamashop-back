const jwt = require('jsonwebtoken');
const { InvalidCredentialsError } = require('../../../domain/exceptions/UsuariosErrors');
const {  toDate}  = require('../../../infrastructure/utils/basic.util');

class ValidarToken {
  execute(rawInput) {
    const authHeader = rawInput.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new InvalidCredentialsError();
    }

    const token = authHeader.slice(7).trim();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return {
        id:              decoded.id,
        usuario:         decoded.usuario,
        primer_nombre:   decoded.primer_nombre,
        primer_apellido: decoded.primer_apellido,
        correo:          decoded.correo,
        emitido:         toDate(decoded.iat),
        expira:          toDate(decoded.exp),
      };
    } catch (err) {
      const mensaje = err.name === 'TokenExpiredError'
        ? 'Token expirado'
        : 'Token inválido';
      const error = new Error(mensaje);
      error.statusCode = 401;
      throw error;
    }
  }
}

module.exports = ValidarToken;