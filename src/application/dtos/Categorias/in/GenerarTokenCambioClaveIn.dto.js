const { requireObjectId,requireString }  = require('../../../../infrastructure/utils/validate.util');
const { toObjectId,trimmedString }             = require('../../../../infrastructure/utils/basic.util');


class GenerarTokenCambioClaveInDTO {
  constructor({ id, ip,agente,usuarioCreacion }) {
    requireObjectId(id, 'id');
    requireObjectId(usuarioCreacion, 'Usuario Creacion');
    requireString(ip,'IP');
    requireString(agente,'Agente');

    this.id              = toObjectId(id);
    this.usuarioCreacion = toObjectId(usuarioCreacion);
    this.agente = trimmedString(agente);
    this.ip = trimmedString(ip);
  }
}

module.exports = GenerarTokenCambioClaveInDTO;
