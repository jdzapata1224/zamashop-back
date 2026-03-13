const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { TallasNotFoundError } = require('../../../domain/exceptions/TallasErrors');
const EliminarTallasIn = require('../../dtos/Tallas/in/EliminarTallasIn.dto');

class EliminarTallas {
  constructor(tallasRepository) {
    this.tallasRepository = tallasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarTallasIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.tallasRepository.findById(inputDto.id);
    if (!existe) throw new TallasNotFoundError(rawInput.id);

    const eliminado = await this.tallasRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarTallas;