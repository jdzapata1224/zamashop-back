const { comparePassword } = require('../../../infrastructure/utils/hash.util');
const jwt      = require('jsonwebtoken');
const LoginInDTO  = require('../../dtos/Auth/in/LoginIn.dto');
const LoginOutDTO = require('../../dtos/Auth/out/LoginOut.dto');
const { InvalidCredentialsError, UserInactiveError } = require('../../../domain/exceptions/UsuariosErrors');
const { v4: uuidv4 } = require('uuid');

const MAX_INTENTOS = 5;

class Login {
  constructor(usuarioRepository, tokensRepository) {
    this.usuarioRepository = usuarioRepository;
    this.tokensRepository  = tokensRepository;
  }

  async execute(rawInput) {
    const inputDto = new LoginInDTO(rawInput);

    // Buscar usuario
    const usuario = await this.usuarioRepository.findByUsuario(inputDto.usuario);
    if (!usuario) throw new InvalidCredentialsError();

    // Verificar password
    const passwordValido = await comparePassword(inputDto.password, usuario.password);
     if (!passwordValido) {
          const intentos = (usuario.intentosFallidos || 0) + 1;
          if (intentos >= MAX_INTENTOS) {
            await this.usuarioRepository.marcarRequiereCambioClave(usuario.id);
            throw new Error('Demasiados intentos fallidos. Debe cambiar su clave antes de continuar.');
          }
          await this.usuarioRepository.incrementarIntentosFallidos(usuario.id);
          throw new InvalidCredentialsError();
        }

    // Verificar estado activo
    if (!usuario.estado) throw new UserInactiveError();
    
    if (usuario.requiereCambioClave) {
      throw new Error('Debe cambiar su clave antes de iniciar sesión.');
    }

    const jti = uuidv4();

    const payload = {
      id:              usuario.id,
      usuario:         usuario.usuario,
      primer_nombre:   usuario.primer_nombre,
      primer_apellido: usuario.primer_apellido,
      correo:          usuario.correo,
      jti,
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    const decoded = jwt.decode(token);

    await this.tokensRepository.create({
      usuarioId: usuario.id,
      jti,
      action:    'LOGIN',
      ip:        rawInput.ip        || null,
      userAgent: rawInput.userAgent || null,
      issuedAt:  new Date(decoded.iat * 1000).toISOString(),
      expiredAt: new Date(decoded.exp * 1000).toISOString(),
      success:   true,
      tipoToken: 'JWT',
    });
    
    return new LoginOutDTO({
      ...payload,
      token,
      emitido: new Date(decoded.iat * 1000).toISOString(),
      expira:  new Date(decoded.exp * 1000).toISOString(),
    });
    
  }
}

module.exports = Login;
