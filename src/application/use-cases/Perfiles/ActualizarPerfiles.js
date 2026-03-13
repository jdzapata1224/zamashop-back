const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesNotFoundError, PerfilesAlreadyExistsError } = require('../../../domain/exceptions/PerfilesErrors');
const ActualizarPerfilesIn = require('../../dtos/Perfiles/in/ActualizarPerfilesIn.dto');



class ActualizarPerfiles {
   constructor(perfilesRepository) {
    this.perfilesRepository          = perfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarPerfilesIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.perfilesRepository.findById(inputDto.id);
    if (!existe) throw new PerfilesNotFoundError(inputDto.id);

    const otroPorNombre = await this.perfilesRepository.findByNombre(inputDto.nombre);
    if (otroPorNombre && otroPorNombre.id !== inputDto.id) {
      throw new PerfilesAlreadyExistsError();
    }
    
    const actualizado = await this.perfilesRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarPerfiles;