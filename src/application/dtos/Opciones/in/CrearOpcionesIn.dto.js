const { Types } = require('mongoose');

class CrearOpcionesInDTO {
  constructor({ nombre,codigo,tipoOpcion,usuarioCreacion }) {
    if (!nombre        || typeof nombre        !== 'string' || !nombre.trim())        throw new Error('Nombre es requerido');   
    if (!codigo      || typeof codigo      !== 'string' || !codigo.trim())      throw new Error('codigo es requerido');
    const trimmedId = String(tipoOpcion).trim();

    if (!Types.ObjectId.isValid(trimmedId)) throw new Error(`Formato id incorrecto: ${trimmedId}`);
    this.tipoOpcion = new Types.ObjectId(trimmedId);
    this.nombre = nombre.trim().toUpperCase();
    this.codigo = codigo.trim().toUpperCase();
    this.usuarioCreacion = (usuarioCreacion && Types.ObjectId.isValid(usuarioCreacion))
      ? new Types.ObjectId(usuarioCreacion)
      : null;
  }
}

module.exports = CrearOpcionesInDTO;