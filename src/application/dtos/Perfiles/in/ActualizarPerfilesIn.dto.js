const { requireString, requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId, toNumber }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarPerfilesInDTO {
  constructor({ id,codigo,nombre,usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(nombre,                 'Nombre');
    requireString(codigo,                 'Codigo');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');
    this.id                   = toObjectId(id);
      this.nombre               = toUpper(nombre);
    this.codigo          = toUpper(codigo);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);

  }
}

module.exports = ActualizarPerfilesInDTO;