const { Types } = require('mongoose');

class EliminarUsuarioInDTO {
  constructor({ id, token }) {

    // Validar id desde la URL
    if (!id) throw new Error('El campo id es requerido');
    const trimmedId = String(id).trim();
    if (!Types.ObjectId.isValid(trimmedId)) throw new Error(`Formato id incorrecto: ${trimmedId}`);
    this.id = new Types.ObjectId(trimmedId);

    // Extraer usuarioEliminacion del Bearer token (opcional)
    // Header esperado: Authorization: Bearer <ObjectId>
    this.usuarioEliminacion = null;
    if (token) {
      const bearer = String(token).startsWith('Bearer ')
        ? token.slice(7).trim()
        : token.trim();
      if (Types.ObjectId.isValid(bearer)) {
        this.usuarioEliminacion =  new Types.ObjectId(bearer);
      }
    }
  }
}

module.exports = EliminarUsuarioInDTO;
