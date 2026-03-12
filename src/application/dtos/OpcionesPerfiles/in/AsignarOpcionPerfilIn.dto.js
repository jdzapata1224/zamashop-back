const { requireObjectId,requireBoolean } = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');

class AsignarOpcionPerfilInDTO {
  constructor({ perfilId, opcionId, activo,usuarioCreacion }) {
    requireObjectId(perfilId, 'perfilId');
    requireObjectId(opcionId, 'opcionId');
    requireObjectId(usuarioActualizacion, 'opcionId');
    requireBoolean(activo,'Asignar');
    
    this.usuarioCreacion = toObjectId(usuarioCreacion);
    this.perfilId = toObjectId(perfilId);
    this.opcionId = toObjectId(opcionId);
    this.activo   = activo;
  }
}

module.exports = AsignarOpcionPerfilInDTO;
