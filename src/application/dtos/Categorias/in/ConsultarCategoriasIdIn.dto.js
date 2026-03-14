const { toObjectId }             = require('../../../../infrastructure/utils/basic.util');
const {  requireObjectId }  = require('../../../../infrastructure/utils/validate.util');


class ConsultarCategoriasIdInDTO {
  constructor({id}) {
    requireObjectId(id, 'id');

    this.id = toObjectId(id);
  }
}
module.exports = ConsultarCategoriasIdInDTO;