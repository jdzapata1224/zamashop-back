const jwt    = require('jsonwebtoken');

class Logout {
  constructor(tokensRepository) {
    this.tokensRepository = tokensRepository;
  }

  async execute(token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Token inválido');
    }
    const existe = await this.tokensRepository.findByJtiYAction(decoded.jti, 'LOGIN');
    if (!existe) throw new Error('Sesión no encontrada o ya cerrada');
    await this.tokensRepository.invalidateByJti(decoded.jti);
  }
}

module.exports = Logout;
