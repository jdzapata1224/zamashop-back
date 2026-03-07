const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const CrearUsuarioIn = require('../../dtos/Usuarios/in/CrearUsuarioIn.dto');



class CrearUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const inputDto = new CrearUsuarioIn(rawInput);
    const existe = await this.usuarioRepository.findByUsuarioOrIdentificacion(
      inputDto.usuario,
      inputDto.identificacion,
    );
    if (existe) throw new UserAlreadyExistsError();

    const creado =await this.usuarioRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear el usuario');

  }
}

module.exports = CrearUsuario;