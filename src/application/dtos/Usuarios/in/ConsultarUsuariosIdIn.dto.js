const { Types } = require('mongoose');


class ConsultarUsuariosIdInDTO {
  constructor(id) {
    if (!id) {
      throw new Error('id must be a non-empty string');
    }
    const trimmedId = String(id).trim();
    if (!Types.ObjectId.isValid(trimmedId)) { 
      throw new Error(`Invalid ObjectId format: ${trimmedId}`);
    }
    this.id = new Types.ObjectId(trimmedId);
  }
}
module.exports = ConsultarUsuariosIdInDTO;