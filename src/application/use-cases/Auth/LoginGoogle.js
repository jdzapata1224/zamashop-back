const jwt = require('jsonwebtoken');
const { randomUUID } = require('crypto');
const { toDate } = require('../../../infrastructure/utils/basic.util');
const { InvalidCredentialsError, UserInactiveError } = require('../../../domain/exceptions/UsuariosErrors');
const LoginOutDTO = require('../../dtos/Auth/out/LoginOut.dto');
const MAX_SESIONES = 3;

class LoginGoogle {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute(rawInput) {
    const { email, verified, ip, userAgent } = rawInput;

    // El email debe estar verificado por Google
    if (!verified) {
      throw new InvalidCredentialsError();
    }

    // Solo usuarios ya registrados con ese correo
    const usuario = await this.usuarioRepository.findByCorreo(email);
    if (!usuario) throw new InvalidCredentialsError();
    if (!usuario.estado) throw new UserInactiveError();

    // Control de sesiones simultáneas (mismo límite que login normal)
    const sesionesActivas = await this.tokensRepository.contarActivasPorUsuario(usuario.id);
    if (sesionesActivas >= MAX_SESIONES) {
      const masAntigua = await this.tokensRepository.findMasAntiguaByUsuario(usuario.id);
      if (masAntigua) await this.tokensRepository.invalidateByJti(masAntigua.tkn_Jti);
    }

    const jti = randomUUID();

    const payload = {
      uui:    usuario.id,
      nombre: usuario.primer_nombre + ' ' + usuario.primer_apellido,
      jti,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    const decoded = jwt.decode(token);

    await this.tokensRepository.create({
      usuarioId:       usuario.id,
      jti,
      accion:          'LOGIN - Google',
      ip:              ip   || null,
      agenteCliente:   userAgent || null,
      fechaExpiracion: toDate(decoded.exp),
      fechaEmision:    toDate(decoded.iat),
      tipoToken:       'JWT',
      usuarioCreacion: usuario.id,
    });

    return new LoginOutDTO({token});
  }
}

module.exports = LoginGoogle;
