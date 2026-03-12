const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriasAlreadyExistsError } = require('../../../domain/exceptions/CategoriasErrors');
const CrearCategoriasIn = require('../../dtos/Categorias/in/CrearCategoriasIn.dto');


class CrearCategorias {
  constructor(categoriasRepository) {
    this.categoriasRepository = categoriasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearCategoriasIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.categoriasRepository.findByNombre(inputDto.nombre);
    if (existeNombre) throw new CategoriasAlreadyExistsError();

    const creado = await this.categoriasRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');

  }
}

module.exports = CrearCategorias;