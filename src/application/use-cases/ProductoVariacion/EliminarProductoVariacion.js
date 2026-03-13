const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoNotFoundError } = require('../../../domain/exceptions/ProductosErrors');
const EliminarProductoIn = require('../../dtos/Productos/in/EliminarProductosIn.dto');

class EliminarProducto {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarProductoIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.productoRepository.findById(inputDto.id);
    if (!existe) throw new ProductoNotFoundError(rawInput.id);

    const eliminado = await this.productoRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarProducto;