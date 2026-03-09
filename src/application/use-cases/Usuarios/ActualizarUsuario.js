const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const ActualizarUsuarioIn = require('../../dtos/Usuarios/in/ActualizarUsuarioIn.dto');



class ActualizarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new ActualizarUsuarioIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.usuarioRepository.findById(inputDto.id.toString());
    if (!existe) throw new UserNotFoundError();

    const otroPorIdentificacion = await this.usuarioRepository.findByIdentificacion(inputDto.identificacion);
    if (otroPorIdentificacion && otroPorIdentificacion.id !== inputDto.id.toString()) {
      throw new Error('La identificacion ya está en uso por otro usuario');
    }
    
    const actualizado = await this.usuarioRepository.update(inputDto);

    if (!actualizado) throw new Error('No se pudo actualizar el usuario');

  }
}

module.exports = ActualizarUsuario;