const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const CambiarEstadoUsuarioIn     = require('../../dtos/Usuarios/in/CambiarEstadoUsuarioIn.dto');

class CambiarEstadoUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new CambiarEstadoUsuarioIn({ ...rawInput, usuarioActualizacion: tokenId });

    // Verificar que el usuario exista
    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError(rawInput.id);

    // Toggle de estado: true → false / false → true
    const nuevoEstado = !existe.estado;

    const actualizado = await this.usuarioRepository.changeStatus({
      id:                 inputDto.id,
      estado:             nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });

    if (!actualizado) throw new Error('No se pudo actualizar el usuario');
  }
}

module.exports = CambiarEstadoUsuario;