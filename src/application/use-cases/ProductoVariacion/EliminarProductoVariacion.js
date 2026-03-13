const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoVariacionNotFoundError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const EliminarProductoVariacionIn = require('../../dtos/ProductoVariacion/in/EliminarProductoVariacionIn.dto');

class EliminarProductoVariacion {
  constructor(productoVariacionRepository) {
    this.productoVariacionRepository = productoVariacionRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarProductoVariacionIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.productoVariacionRepository.findById(inputDto.id);
    if (!existe) throw new ProductoVariacionNotFoundError(rawInput.id);

    const eliminado = await this.productoVariacionRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });
    if (!eliminado) throw new Error('No se pudo eliminar la categoría');
  }
}

module.exports = EliminarProductoVariacion;