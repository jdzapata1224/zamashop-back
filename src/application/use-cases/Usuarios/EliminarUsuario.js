const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const EliminarUsuarioIn     = require('../../dtos/Usuarios/in/EliminarUsuarioIn.dto');

class EliminarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new EliminarUsuarioIn({ ...rawInput, usuarioEliminacion: tokenId });

    // Verificar que el usuario exista
    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError(rawInput.id);

    // Toggle de estado: true → false / false → true

    const eliminado = await this.usuarioRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });

    if (!eliminado) throw new Error('No se pudo actualizar el usuario');
  }
}

module.exports = EliminarUsuario;