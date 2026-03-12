const { requireObjectId,requireBoolean } = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');

class AsignarOpcionUsuarioInDTO {
  constructor({ usuarioId, opcionId, activo,usuarioCreacion }) {
    requireObjectId(usuarioId, 'Id Usuario');
    requireObjectId(opcionId, 'opcionId');
    requireObjectId(usuarioCreacion, 'opcionId');
    requireBoolean(activo,'Asignar');

    this.usuarioCreacion = toObjectId(usuarioCreacion);
    this.usuarioId = toObjectId(usuarioId);
    this.opcionId = toObjectId(opcionId);
    this.activo   = activo;
  }
}

module.exports = AsignarOpcionUsuarioInDTO;
