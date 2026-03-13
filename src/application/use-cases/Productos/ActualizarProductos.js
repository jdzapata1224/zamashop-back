const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductosNotFoundError, ProductosAlreadyExistsError } = require('../../../domain/exceptions/ProductosErrors');
const ActualizarProductosIn = require('../../dtos/Productos/in/ActualizarProductosIn.dto');



class ActualizarProductos {
   constructor(productoRepository) {
    this.productoRepository          = productoRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarProductosIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.productoRepository.findById(inputDto.id);
    if (!existe) throw new ProductosNotFoundError(inputDto.id);

    const otroPorNombre = await this.productoRepository.findByNombreYCategoria(inputDto.nombre,inputDto.categoriaId);
    if (otroPorNombre && otroPorNombre.id !== inputDto.id) {
      throw new ProductosAlreadyExistsError();
    }
    
    const actualizado = await this.productoRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarProductos;