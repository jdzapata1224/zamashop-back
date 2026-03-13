const { requireString, requireObjectId, requireBoolean, requireDecimal, requireNumber } = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId, toBoolean, trimmedString, toNumber, toDecimal } = require('../../../../infrastructure/utils/basic.util');

class ActualizarProductoVariacionInDTO {
  constructor({ id, codigo, stock, precio, tallaId, colorId, productoId, usuarioActualizacion }) {
    requireObjectId(id, 'id');
    requireString(codigo, 'Codigo');
    requireNumber(stock, 'Stock');
    requireDecimal(precio, 'Precio');
    requireObjectId(tallaId, 'Talla Id');
    requireObjectId(colorId, 'Color Id');
    requireObjectId(productoId, 'Producto');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');

    this.id = toObjectId(id);
    this.codigo = toUpper(codigo);
    this.stock = toNumber(stock);
    this.precio = toDecimal(precio);
    this.tallaId = toObjectId(tallaId);
    this.colorId = toObjectId(colorId);
    this.productoId = toObjectId(productoId);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);


  }
}

module.exports = ActualizarProductoVariacionInDTO;