const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriaNotFoundError } = require('../../../domain/exceptions/CategoriasErrors');
const EliminarCategoriaIn = require('../../dtos/Categorias/in/EliminarCategoriasIn.dto');

class EliminarCategoria {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarCategoriaIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.categoriaRepository.findById(inputDto.id);
    if (!existe) throw new CategoriaNotFoundError(rawInput.id);

    const eliminado = await this.categoriaRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarCategoria;