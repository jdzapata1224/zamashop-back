const CambiarClaveIn = require('../../dtos/Usuarios/in/CambiarClaveIn.dto');
const jwt = require('jsonwebtoken');

class CambiarClave {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute({ token, nuevaClave }) {
    const inputDto = new CambiarClaveIn({token,nuevaClave});


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

    await this.usuarioRepository.cambiarClave({...inputDto,id:decoded.id});
    await this.tokensRepository.invalidateByJti(decoded.jti);
  }
}

module.exports = CambiarClave;
