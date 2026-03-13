const { requireString, requireObjectId,requireBoolean }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,toBoolean,trimmedString }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarColoresInDTO {
  constructor({ id,nombre,hex,usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(nombre,                 'Nombre');
    requireString(hex,                 'Hex');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');
    
    this.id                   = toObjectId(id);
    this.nombre               = toUpper(nombre);
    this.hex          = trimmedString(hex);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);

  }
}

module.exports = ActualizarColoresInDTO;