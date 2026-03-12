const { requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');

class GenerarTokenCambioClaveInDTO {
  constructor({ id, usuarioCreacion }) {
    requireObjectId(id,                   'id');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    
    this.id = toObjectId(id);
    this.usuarioCreacion = toObjectId(usuarioCreacion);

  }
}

module.exports = GenerarTokenCambioClaveInDTO;
