const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriaNotFoundError, CategoriasAlreadyExistsError } = require('../../../domain/exceptions/CategoriasErrors');
const ActualizarCategoriasIn = require('../../dtos/Categorias/in/ActualizarCategoriasIn.dto');



class ActualizarCategorias {
   constructor(categoriaRepository) {
    this.categoriaRepository          = categoriaRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarCategoriasIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.categoriaRepository.findById(inputDto.id);
    if (!existe) throw new CategoriaNotFoundError(inputDto.id);

    const otroPorNombre = await this.categoriaRepository.findByNombre(inputDto.nombre);
    if (otroPorNombre && otroPorIdentificacion.id !== inputDto.id) {
      throw new CategoriasAlreadyExistsError();
    }
    
    const actualizado = await this.categoriaRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarCategorias;