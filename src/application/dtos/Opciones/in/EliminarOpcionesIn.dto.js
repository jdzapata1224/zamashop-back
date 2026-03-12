const {toObjectId }             = require('../../../../infrastructure/utils/basic.util');
const { requireObjectId }  = require('../../../../infrastructure/utils/validate.util');

class EliminarOpcionesInDTO {
  constructor({ id, usuarioEliminacion }) {
    requireObjectId(id, 'id');
    requireObjectId(usuarioEliminacion, 'Usuario Eliminacion');

    this.id      = toObjectId(id);
    this.usuarioEliminacion      = toObjectId(usuarioEliminacion);
  }
}

module.exports = EliminarOpcionesInDTO;
