const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductosAlreadyExistsError } = require('../../../domain/exceptions/ProductosErrors');
const CrearProductosIn = require('../../dtos/Productos/in/CrearProductosIn.dto');
const CrearProductosOut = require('../../dtos/Productos/out/CrearProductosOut.dto');


class CrearProductos {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearProductosIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.productoRepository.findByNombreYCategoria(inputDto.nombre,inputDto.categoriaId);
    if (existeNombre) throw new ProductosAlreadyExistsError();

    const creado = await this.productoRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');

    return new CrearProductosOut(creado);


  }
}

module.exports = CrearProductos;