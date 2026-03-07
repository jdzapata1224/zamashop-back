const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const CrearUsuarioIn = require('../../dtos/Usuarios/in/CrearUsuarioIn.dto');



class CrearUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute() {
    const inputDto = new CrearUsuarioIn(rawInput);
    const existe = await this.usuarioRepository.findByUsuarioOrIdentificacion(
      inputDto.usuario,
      inputDto.identificacion,
    );
    if (existe) throw new UserAlreadyExistsError();

    const nuevoUsuario = await this.usuarioRepository.create(inputDto);
    return CrearUsuarioOut.fromEntity(nuevoUsuario);
  }
}

module.exports = CrearUsuario;