const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const EliminarUsuarioIn     = require('../../dtos/Usuarios/in/EliminarUsuarioIn.dto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');

class EliminarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarUsuarioIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError(rawInput.id);


    const eliminado = await this.usuarioRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });

    if (!eliminado) throw new Error('No se pudo actualizar el usuario');
  }
}

module.exports = EliminarUsuario;