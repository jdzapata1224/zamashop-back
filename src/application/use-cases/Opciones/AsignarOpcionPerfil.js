const AsignarOpcionPerfilInDTO  = require('../../dtos/OpcionesPerfiles/in/AsignarOpcionPerfilIn.dto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');

class AsignarOpcionPerfil {
  constructor(opcionesPerfilesRepository) {
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new AsignarOpcionPerfilInDTO({ ...rawInput, usuarioCreacion: tokenId });

    const existe = await this.opcionesPerfilesRepository.findByPerfilYOpcion(inputDto.perfilId, inputDto.opcionId);

    if (inputDto.activo) {
      if (existe) throw new Error('La opción ya está asignada al perfil');
      await this.opcionesPerfilesRepository.createOne(inputDto.perfilId, inputDto.opcionId, tokenId);
    } else {
      if (!existe) throw new Error('La opción no está asignada al perfil');
      await this.opcionesPerfilesRepository.deleteOne(inputDto.perfilId, inputDto.opcionId);
    }
  }
}

module.exports = AsignarOpcionPerfil;