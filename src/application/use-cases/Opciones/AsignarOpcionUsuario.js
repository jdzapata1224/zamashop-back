const AsignarOpcionUsuarioInDTO  = require('../../dtos/OpcionesUsuarios/in/AsignarOpcionUsuarioIn.dto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');

class AsignarOpcionUsuario {
  constructor(opcionesUsuariosRepository) {
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new AsignarOpcionUsuarioInDTO({ ...rawInput, usuarioCreacion: tokenId });

    const existe = await this.opcionesUsuariosRepository.findByUsuarioYOpcion(inputDto.usuarioId, inputDto.opcionId);

    if (activo) {
      if (existe) throw new Error('La opción ya está asignada al usuario');
      await this.opcionesUsuariosRepository.createOne(inputDto.usuarioId, inputDto.opcionId, tokenId);
    } else {
      if (!existe) throw new Error('La opción no está asignada al usuario');
      await this.opcionesUsuariosRepository.deleteOne(inputDto.usuarioId, inputDto.opcionId);
    }
  }
}

module.exports = AsignarOpcionUsuario;