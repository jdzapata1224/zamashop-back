const { Types } = require('mongoose');

class EliminarUsuarioInDTO {
  constructor({ id, usuarioEliminacion }) {

    // Validar id desde la URL
    if (!id) throw new Error('El campo id es requerido');
    const trimmedId = String(id).trim();
    if (!Types.ObjectId.isValid(trimmedId)) throw new Error(`Formato id incorrecto: ${trimmedId}`);
    this.id = new Types.ObjectId(trimmedId);

    // Extraer usuarioEliminacion del Bearer token (opcional)
    // Header esperado: Authorization: Bearer <ObjectId>
    this.usuarioEliminacion  = (usuarioEliminacion && Types.ObjectId.isValid(usuarioEliminacion))
      ? new Types.ObjectId(usuarioEliminacion)
      : null;
  }
}

module.exports = EliminarUsuarioInDTO;
