const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');
const {  requireObjectId }  = require('../../../../infrastructure/utils/validate.util');


class ConsultarColoresIdInDTO {
  constructor({id}) {
    requireObjectId(id, 'id');

    this.id = toObjectId(id);
  }
}
module.exports = ConsultarColoresIdInDTO;