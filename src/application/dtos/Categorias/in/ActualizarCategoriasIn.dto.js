const { requireString, requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString }             = require('../../../../infrastructure/utils/basic.util');

class ActualizarCategoriasInDTO {
  constructor({ id,nombre,descripcion,usuarioActualizacion }) {
    requireObjectId(id,                   'id');
    requireString(nombre,                 'Nombre');
    requireString(descripcion,            'Descripcion');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');

    this.id                   = toObjectId(id);
    this.nombre               = toUpper(nombre);
    this.descripcion          = trimmedString(descripcion);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);

  }
}

module.exports = ActualizarCategoriasInDTO;