const { ProductoVariacionEmptyError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const ConsultarProductoVariacionOut = require('../../dtos/ProductoVariacion/out/ConsultarProductoVariacionOut.dto');

class ConsultarProductoVariacion {
  constructor(productoVariacionRepository) {
    this.productoVariacionRepository = productoVariacionRepository;
  }

  async execute() {
    const ProductoVariacion = await this.productoVariacionRepository.find();
    if (!ProductoVariacion || ProductoVariacion.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarProductoVariacionOut.fromEntities(ProductoVariacion);
  }
}

module.exports = ConsultarProductoVariacion;