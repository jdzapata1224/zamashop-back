const { requireString, requireDecimal,requireObjectId,requireBoolean,requireNumber }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString,toBoolean,toDecimal }             = require('../../../../infrastructure/utils/basic.util');

class CrearTallasInDTO {
  constructor({ nombre,orden,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(orden,            'Orden');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');

    this.nombre               = toUpper(nombre);
    this.descripcion          = trimmedString(descripcion);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
    this.orden=toNumber(orden);

  }
}

module.exports = CrearTallasInDTO;