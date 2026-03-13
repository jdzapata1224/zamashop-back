const { requireString, requireDecimal,requireObjectId,requireBoolean,requireNumber }  = require('../../../../infrastructure/utils/validate.util');
const { toUpper, toObjectId,toNumber }             = require('../../../../infrastructure/utils/basic.util');

class CrearPerfilesInDTO {
  constructor({ nombre,codigo,usuarioCreacion }) {
    requireString(nombre,                 'Nombre');
    requireString(codigo,            'Codigo');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');

    this.nombre               = toUpper(nombre);
    this.usuarioCreacion      = toObjectId(usuarioCreacion);
    this.codigo=toUpper(codigo);

  }
}

module.exports = CrearPerfilesInDTO;