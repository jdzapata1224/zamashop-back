const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const CambiarEstadoUsuarioIn     = require('../../dtos/Usuarios/in/CambiarEstadoUsuarioIn.dto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');

class CambiarEstadoUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoUsuarioIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError(rawInput.id);

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