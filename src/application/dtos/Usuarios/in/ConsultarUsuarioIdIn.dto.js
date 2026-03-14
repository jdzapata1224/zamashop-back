const { requireObjectId }  = require('../../../../infrastructure/utils/validate.util');
const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');


class ConsultarUsuarioIdInDTO {
  constructor({id}) {
    requireObjectId(id,                   'id');

    this.id = toObjectId(id);
  }
}
module.exports = ConsultarUsuarioIdInDTO;