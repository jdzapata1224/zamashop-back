const jwt = require('jsonwebtoken');

class CambiarClave {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute({ token, nuevaClave }) {
    if (!token)      throw new Error('Token requerido');
    if (!nuevaClave) throw new Error('Nueva clave requerida');

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const msg = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
      throw new Error(msg);
    }

    if (decoded.action !== 'CAMBIO_CLAVE') throw new Error('Token no válido para esta operación');

    const tokenDoc = await this.tokensRepository.findByJtiYAction(decoded.jti, 'CAMBIO_CLAVE');
    if (!tokenDoc) throw new Error('Token ya utilizado o inválido');

    await this.usuarioRepository.cambiarClave(decoded.id, nuevaClave);
    await this.tokensRepository.invalidateByJti(decoded.jti);
  }
}

module.exports = CambiarClave;
