const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesNotFoundError } = require('../../../domain/exceptions/PerfilesErrors');
const EliminarPerfilesIn = require('../../dtos/Perfiles/in/EliminarPerfilesIn.dto');

class EliminarPerfiles {
  constructor(PerfilesRepository) {
    this.PerfilesRepository = PerfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarPerfilesIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.PerfilesRepository.findById(inputDto.id);
    if (!existe) throw new PerfilesNotFoundError(rawInput.id);

    const eliminado = await this.PerfilesRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarPerfiles;