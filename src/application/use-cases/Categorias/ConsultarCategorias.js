const { CategoriaEmptyError } = require('../../../domain/exceptions/CategoriasErrors');
const ConsultarCategoriasOut = require('../../dtos/Categorias/out/ConsultarCategoriasOut.dto');



class ConsultarCategorias {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async execute() {
    const categorias = await this.categoriaRepository.find();
    if (!categorias || categorias.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarCategoriasOut.fromEntities(categorias);
  }
}

module.exports = ConsultarCategorias;