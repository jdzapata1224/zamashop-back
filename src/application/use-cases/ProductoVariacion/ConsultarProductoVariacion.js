const { ProductoEmptyError } = require('../../../domain/exceptions/ProductosErrors');
const ConsultarProductosOut = require('../../dtos/Productos/out/ConsultarProductosOut.dto');

class ConsultarProductos {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute() {
    const productos = await this.productoRepository.find();
    if (!productos || productos.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarProductosOut.fromEntities(productos);
  }
}

module.exports = ConsultarProductos;