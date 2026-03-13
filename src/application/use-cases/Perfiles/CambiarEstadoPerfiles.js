const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesNotFoundError } = require('../../../domain/exceptions/PerfilesErrors');
const CambiarEstadoPerfilesIn = require('../../dtos/Perfiles/in/CambiarEstadoPerfilesIn.dto');

class CambiarEstadoPerfiles {
  constructor(PerfilesRepository) {
    this.perfilesRepository = perfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoPerfilesIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.perfilesRepository.findById(inputDto.id);
    if (!existe) throw new PerfilesNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.perfilesRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoPerfiles;