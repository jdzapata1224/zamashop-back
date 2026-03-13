const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductosNotFoundError } = require('../../../domain/exceptions/ProductosErrors');
const ConsultarProductosOut = require('../../dtos/Productos/out/ConsultarProductosOut.dto');
const ConsultarProductosIdIn = require('../../dtos/Productos/in/ConsultarProductosIdIn.dto');

class ConsultarProductosId {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarProductosIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const producto = await this.productoRepository.findById(inputDto.id);
    if (!producto) throw new ProductosNotFoundError(rawInput.id);
    return ConsultarProductosOut.fromEntity(producto);
  }
}

module.exports = ConsultarProductosId;