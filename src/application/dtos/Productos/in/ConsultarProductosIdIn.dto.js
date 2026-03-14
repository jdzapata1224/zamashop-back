const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');
const {  requireObjectId }  = require('../../../../infrastructure/utils/validate.util');


class ConsultarProductosIdInDTO {
  constructor({id}) {
    requireObjectId(id, 'id');

    this.id = toObjectId(id);
  }
}
module.exports = ConsultarProductosIdInDTO;