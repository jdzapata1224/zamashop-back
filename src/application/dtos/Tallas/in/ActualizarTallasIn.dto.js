const { requireString, requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId, toNumber }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarTallasInDTO {
  constructor({ id,nombre,orden,usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(nombre,                 'Nombre');
    requireString(orden,                 'Orden');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');
    this.id                   = toObjectId(id);
      this.nombre               = toUpper(nombre);
    this.orden          = toNumber(orden);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);

  }
}

module.exports = ActualizarTallasInDTO;