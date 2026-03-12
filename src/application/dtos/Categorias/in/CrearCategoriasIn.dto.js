const { requireString, requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,trimmedString }             = require('../../../../infrastructure/utils/basic.util');

class CrearCategoriasInDTO {
  constructor({ nombre,descripcion,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(descripcion,            'Descripcion');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');

    this.nombre               = toUpper(nombre);
    this.descripcion          = trimmedString(descripcion);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);

  }
}

module.exports = CrearCategoriasInDTO;