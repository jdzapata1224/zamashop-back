const { requireNumber,requireString,requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { trimmedString,toDate,toObjectId }  = require('../../../../infrastructure/utils/basic.util');

class GenerarTokenInDTO {
  constructor({ usuarioId,usuarioCreacion }) {
    requireObjectId(usuarioId, 'Usuario Id');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    
    this.usuarioId  = toObjectId(usuarioId);
    this.usuarioCreacion  = toObjectId(usuarioCreacion);
    
  }
}

module.exports = GenerarTokenInDTO;
