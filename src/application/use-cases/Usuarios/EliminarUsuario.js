const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const EstructuraUsuarioIdIn = require('../../dtos/Usuarios/in/EstructuraUsuarioIdIn.dto');



class EliminarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const inputDto = new EstructuraUsuarioIdIn(rawInput);
    const existe = await this.usuarioRepository.findByUsuarioOrIdentificacion(
      inputDto.usuario,
      inputDto.identificacion,
    );
    if (existe) throw new UserAlreadyExistsError();

    const creado =await this.usuarioRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear el usuario');

  }
}

module.exports = EliminarUsuario;