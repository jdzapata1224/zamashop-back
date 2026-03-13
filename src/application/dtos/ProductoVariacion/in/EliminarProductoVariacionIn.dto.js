const { requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');


class EliminarProductoVariacionInDTO {
  constructor({ id, usuarioEliminacion }) {
    requireObjectId(id, 'id');
    requireObjectId(usuarioEliminacion, 'Usuario Eliminacion');

    this.id                   = toObjectId(id);
    this.usuarioEliminacion = toObjectId(usuarioEliminacion);
  }
}

module.exports = EliminarProductoVariacionInDTO;
