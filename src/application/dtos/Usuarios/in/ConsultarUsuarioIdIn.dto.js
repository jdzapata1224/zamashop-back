const { Types } = require('mongoose');


class ConsultarUsuarioIdInDTO {
  constructor(id) {
    if (!id) {
      throw new Error('El campo id es requerido');
    }
    const trimmedId = String(id).trim();
    if (!Types.ObjectId.isValid(trimmedId)) { 
      throw new Error(`Formato Id incorrecto: ${trimmedId}`);
    }
    this.id = new Types.ObjectId(trimmedId);
  }
}
module.exports = ConsultarUsuarioIdInDTO;