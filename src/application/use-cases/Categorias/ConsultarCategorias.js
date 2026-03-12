const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriaEmptyError } = require('../../../domain/exceptions/CategoriasErrors');
const ConsultarCategoriasOut = require('../../dtos/Categorias/out/ConsultarCategoriasOut.dto');



class ConsultarCategorias {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const categorias = await this.categoriaRepository.find();
    if (!categorias || categorias.length === 0) throw new CategoriaEmptyError();
    return ConsultarCategoriasOut.fromEntities(categorias);
  }
}

module.exports = ConsultarCategorias;