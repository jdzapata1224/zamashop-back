const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoVariacionNotFoundError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const ConsultarProductoVariacionOut = require('../../dtos/ProductoVariacion/out/ConsultarProductoVariacionOut.dto');
const ConsultarProductoVariacionIdIn = require('../../dtos/ProductoVariacion/in/ConsultarProductoVariacionIdIn.dto');

class ConsultarProductoVariacionId {
  constructor(productoVariacionRepository) {
    this.productoVariacionRepository = productoVariacionRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarProductoVariacionIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const producto = await this.productoVariacionRepository.findById(inputDto.id);
    if (!producto) throw new ProductoVariacionNotFoundError(rawInput.id);
    return ConsultarProductoVariacionOut.fromEntity(producto);
  }
}

module.exports = ConsultarProductoVariacionId;