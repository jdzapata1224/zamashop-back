const { Types } = require('mongoose');

class EliminarUsuarioInDTO {
  constructor({ id, usuarioEliminacion }) {


    if (!id || !Types.ObjectId.isValid(id)) throw new Error('id es requerido y debe ser un Id válido');
    if (!usuarioEliminacion || !Types.ObjectId.isValid(usuarioEliminacion)) throw new Error('usuarioEliminacion es requerido y debe ser un Id válido');

    this.id = new Types.ObjectId(id);
    this.usuarioEliminacion  = new Types.ObjectId(usuarioEliminacion);
  }
}

module.exports = EliminarUsuarioInDTO;
