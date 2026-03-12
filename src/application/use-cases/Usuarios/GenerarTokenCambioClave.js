const jwt         = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const GenerarTokenCambioClaveInDTO     = require('../../dtos/Usuarios/in/GenerarTokenCambioClaveIn.dto');
const {  toDate}  = require('../../../infrastructure/utils/basic.util');

class GenerarTokenCambioClave {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputConsultarUsuarioDto = new GenerarTokenCambioClaveInDTO({ ...rawInput, usuarioCreacion: tokenId });

    const usuario = await this.usuarioRepository.findById(inputConsultarUsuarioDto.id);
    if (!usuario) throw new Error('Usuario no encontrado');

    const tokenActivo = await this.tokensRepository.findActivoByUsuarioYAction(usuario.id, 'CAMBIO_CLAVE');
    if (tokenActivo) {
      const expira = tokenActivo.tkn_Fecha_Expiracion;
      throw new Error(`Ya existe un token de cambio de clave activo. Expira: ${expira}`);
    }

    // Invalida tokens de cambio de clave anteriores
    await this.tokensRepository.invalidateByUsuarioYAction(usuario.id, 'CAMBIO_CLAVE');

    const jti   = randomUUID();
    const token = jwt.sign(
      { id: usuario.id, jti, action: 'CAMBIO_CLAVE' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const decoded = jwt.decode(token);


    await this.tokensRepository.create({
      usuarioId:inputConsultarUsuarioDto.id,
      jti,
      accion:    'CAMBIO_CLAVE',
      ip:        rawInput.ip        || null,
      agenteCliente: rawInput.userAgent || null,
      fechaExpiracion: toDate(decoded.exp),
      fechaEmision: toDate(decoded.iat),
      tipoToken: 'JWT',
      usuarioCreacion: usuario.id,
    });

    return { token };
  }
}

module.exports = GenerarTokenCambioClave;
