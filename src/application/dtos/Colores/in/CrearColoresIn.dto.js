const { requireString, requireDecimal,requireObjectId,requireBoolean,requireNumber }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString,toBoolean,toDecimal }             = require('../../../../infrastructure/utils/basic.util');

class CreaColoresInDTO {
  constructor({ nombre,hex,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(hex,            'Hex');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    

    this.nombre               = toUpper(nombre);
    this.hex          = trimmedString(hex);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
    

  }
}

module.exports = CreaColoresInDTO;