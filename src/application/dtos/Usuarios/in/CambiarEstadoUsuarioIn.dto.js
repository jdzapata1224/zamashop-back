const { Types } = require('mongoose');

class CambiarEstadoUsuarioInDTO {
  constructor({ id, usuarioActualizacion }) {

    if (!id || !Types.ObjectId.isValid(id)) throw new Error('id es requerido y debe ser un Id válido');
    if (!usuarioActualizacion || !Types.ObjectId.isValid(usuarioActualizacion)) throw new Error('usuarioActualizacion es requerido y debe ser un Id válido');
    
    this.id = new Types.ObjectId(trimmedId);
    this.usuarioActualizacion = new Types.ObjectId(usuarioActualizacion);
  }
}

module.exports = CambiarEstadoUsuarioInDTO;
