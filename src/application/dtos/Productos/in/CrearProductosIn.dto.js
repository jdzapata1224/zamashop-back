const { requireString, requireDecimal,requireObjectId,requireBoolean,requireNumber }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString,toBoolean,toDecimal }             = require('../../../../infrastructure/utils/basic.util');

class CrearProductosInDTO {
  constructor({ nombre,descripcion,codigo,tieneTalla,tieneColor,categoriaId,usuarioCreacion,precioBase }) {
    requireString(nombre,                 'Nombre');
    requireString(descripcion,            'Descripcion');
    requireString(codigo,            'Codigo');
    requireBoolean(tieneColor,            'Tiene Color');
    requireBoolean(tieneTalla,            'Tiene Talla');
    requireObjectId(categoriaId, 'Usuario Creacion');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    requireDecimal(precioBase, 'Precio Base');

    this.categoriaId          = toObjectId(categoriaId);
    this.codigo               = toUpper(codigo);
    this.tieneTalla               = toBoolean(tieneTalla);
    this.tieneColor               = toBoolean(tieneColor);
    this.nombre               = toUpper(nombre);
    this.descripcion          = trimmedString(descripcion);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
    this.precioBase=toDecimal(precioBase);

  }
}

module.exports = CrearProductosInDTO;