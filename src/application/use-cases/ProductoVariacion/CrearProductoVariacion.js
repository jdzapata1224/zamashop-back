const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductosAlreadyExistsError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const CrearProductoVariacionIn = require('../../dtos/ProductoVariacion/in/CrearProductoVariacionIn.dto');


class CrearProductoVariacion {
  constructor(productoVariacionRepository) {
    this.productoVariacionRepository = productoVariacionRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearProductoVariacionIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.productoVariacionRepository.findByPrdTalCol(inputDto.productoId,inputDto.tallaId,inputDto.colorId);
    if (existeNombre) throw new ProductosAlreadyExistsError();

    const creado = await this.productoVariacionRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');

  }
}

module.exports = CrearProductoVariacion;