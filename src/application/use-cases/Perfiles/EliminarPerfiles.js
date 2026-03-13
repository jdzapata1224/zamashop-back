const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesNotFoundError } = require('../../../domain/exceptions/PerfilesErrors');
const EliminarPerfilesIn = require('../../dtos/Perfiles/in/EliminarPerfilesIn.dto');

class EliminarPerfiles {
  constructor(perfilesRepository) {
    this.perfilesRepository = perfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarPerfilesIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.perfilesRepository.findById(inputDto.id);
    if (!existe) throw new PerfilesNotFoundError(rawInput.id);

    const eliminado = await this.perfilesRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarPerfiles;