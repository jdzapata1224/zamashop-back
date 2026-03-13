const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriaNotFoundError } = require('../../../domain/exceptions/CategoriasErrors');
const ConsultarCategoriasOut = require('../../dtos/Categorias/out/ConsultarCategoriasOut.dto');
const ConsultarCategoriasIdIn = require('../../dtos/Categorias/in/ConsultarCategoriasIdIn.dto');

class ConsultarCategoriasId {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarCategoriasIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const categoria = await this.categoriaRepository.findById(inputDto.id);
    if (!categoria) throw new CategoriaNotFoundError(rawInput.id);
    return ConsultarCategoriasOut.fromEntity(categoria);
  }
}

module.exports = ConsultarCategoriasId;