const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const EliminarUsuarioIn     = require('../../dtos/Usuarios/in/EliminarUsuarioIn.dto');

class EliminarUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const inputDto = new EliminarUsuarioIn(rawInput);

    // Verificar que el usuario exista
    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError(rawInput.id);

    // Toggle de estado: true → false / false → true
    const nuevoEstado = !existe.estado;

    const eliminado = await this.usuarioRepository.delete({
      id:                 inputDto.id,
      estado:             nuevoEstado,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });

    if (!eliminado) throw new Error('No se pudo actualizar el usuario');
  }
}

module.exports = EliminarUsuario;