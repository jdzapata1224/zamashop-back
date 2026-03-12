const { requireString, requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId }             = require('../../../../infrastructure/utils/basic.util');

class CrearOpcionesInDTO {
  constructor({ nombre,codigo,tipoOpcion,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(codigo,                 'Codigo');
    requireObjectId(tipoOpcion, 'Tipo Opcion');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');

    this.tipoOpcion      = toObjectId(tipoOpcion);
    this.nombre               = toUpper(nombre);
    this.codigo               = toUpper(codigo);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
  }
}

module.exports = CrearOpcionesInDTO;