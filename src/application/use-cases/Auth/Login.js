const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const LoginInDTO  = require('../../dtos/Usuarios/in/LoginIn.dto');
const LoginOutDTO = require('../../dtos/Usuarios/out/LoginOut.dto');
const { InvalidCredentialsError, UserInactiveError } = require('../../../domain/exceptions/UsuariosErrors');

class Login {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const inputDto = new LoginInDTO(rawInput);

    // Buscar usuario
    const usuario = await this.usuarioRepository.findByUsuario(inputDto.usuario);
    if (!usuario) throw new InvalidCredentialsError();

    // Verificar password
    const passwordValido = await bcrypt.compare(inputDto.password, usuario.password);
    if (!passwordValido) throw new InvalidCredentialsError();

    // Verificar estado activo
    if (!usuario.estado) throw new UserInactiveError();

    // Generar token
    const payload = {
      id:              usuario.id,
      usuario:         usuario.usuario,
      primer_nombre:   usuario.primer_nombre,
      primer_apellido: usuario.primer_apellido,
      correo:          usuario.correo,
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    const decoded = jwt.decode(token);
    return new LoginOutDTO({
      ...payload,
      token,
      emitido: new Date(decoded.iat * 1000).toISOString(),
      expira:  new Date(decoded.exp * 1000).toISOString(),
    });
    
  }
}

module.exports = Login;
