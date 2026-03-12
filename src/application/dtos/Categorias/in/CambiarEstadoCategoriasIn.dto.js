const { requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');

class CambiarEstadoCategoriasInDTO {
  constructor({ id, usuarioActualizacion }) {
    requireObjectId(id, 'id');
    requireObjectId(usuarioActualizacion, 'Usuario Actualizacion');
    
    this.id                   = toObjectId(id);
    this.usuarioActualizacion = toObjectId(usuarioActualizacion);
   
  }
}

module.exports = CambiarEstadoCategoriasInDTO;
