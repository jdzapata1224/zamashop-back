const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ColoresNotFoundError } = require('../../../domain/exceptions/ColoresErrors');
const EliminarColoresIn = require('../../dtos/Colores/in/EliminarColoresIn.dto');

class EliminarColores {
  constructor(coloresRepository) {
    this.coloresRepository = coloresRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarColoresIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.coloresRepository.findById(inputDto.id);
    if (!existe) throw new ColoresNotFoundError(rawInput.id);

    const eliminado = await this.coloresRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarColores;