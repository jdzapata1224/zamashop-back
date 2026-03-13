const { requireString, requireDecimal,requireObjectId,requireBoolean,requireNumber }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString,toBoolean,toDecimal, toNumber }             = require('../../../../infrastructure/utils/basic.util');

class CrearProductoVariacionInDTO {
  constructor({ codigo,stock,precio,tallaId,colorId,productoId,usuarioCreacion}) {    
    requireString(codigo,            'Codigo');
    requireNumber(stock,            'Stock');
    requireDecimal(precio,            'Precio');
    requireObjectId(colorId,            'Color ID');
    requireObjectId(productoId,            'Producto ID');
    requireObjectId(tallaId,            'Talla ID');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    
    this.codigo               = toUpper(codigo);
    this.stock          = toNumber(stock);
    this.precio=toDecimal(precio);
    this.colorId               = toObjectId(colorId);
    this.productoId               = toObjectId(productoId);
    this.tallaId          = toObjectId(tallaId);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
    

  }
}

module.exports = CrearProductoVariacionInDTO;