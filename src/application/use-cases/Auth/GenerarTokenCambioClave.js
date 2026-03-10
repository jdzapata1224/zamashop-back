const jwt         = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class GenerarTokenCambioClave {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute({ usuarioId, ip, userAgent }) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    if (!usuario) throw new Error('Usuario no encontrado');

    const tokenActivo = await this.tokensRepository.findActivoByUsuarioYAction(usuarioId, 'CAMBIO_CLAVE');
    if (tokenActivo) {
      const expira = new Date(tokenActivo.tkn_ExpiredAt).toISOString();
      throw new Error(`Ya existe un token de cambio de clave activo. Expira: ${expira}`);
    }

    // Invalida tokens de cambio de clave anteriores
    await this.tokensRepository.invalidateByUsuarioYAction(usuarioId, 'CAMBIO_CLAVE');

    const jti   = uuidv4();
    const token = jwt.sign(
      { id: usuario.id, jti, action: 'CAMBIO_CLAVE' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const decoded = jwt.decode(token);

    await this.tokensRepository.create({
      usuarioId,
      jti,
      action:    'CAMBIO_CLAVE',
      ip:        ip        || null,
      userAgent: userAgent || null,
      issuedAt:  new Date(decoded.iat * 1000).toISOString(),
      expiredAt: new Date(decoded.exp * 1000).toISOString(),
      success:   true,
      tipoToken: 'JWT',
    });

    return { token };
  }
}

module.exports = GenerarTokenCambioClave;
