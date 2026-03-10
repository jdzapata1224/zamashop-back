const { Types } = require('mongoose');


class ConsultarUsuarioIdInDTO {
  constructor(id) {
    if (!id || !Types.ObjectId.isValid(id)) throw new Error('id es requerido y debe ser un Id válido');

    this.id = new Types.ObjectId(trimmedId);
  }
}
module.exports = ConsultarUsuarioIdInDTO;