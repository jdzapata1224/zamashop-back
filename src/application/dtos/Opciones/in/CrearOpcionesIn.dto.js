const { Types } = require('mongoose');

class CrearOpcionesInDTO {
  constructor({ nombre,codigo,tipoOpcion,usuarioCreacion }) {
    if (!nombre        || typeof nombre        !== 'string' || !nombre.trim())        throw new Error('Nombre es requerido');   
    if (!codigo      || typeof codigo      !== 'string' || !codigo.trim())      throw new Error('codigo es requerido');
    
    const trimmedTipoOpcionId = String(tipoOpcion).trim();
    if (!Types.ObjectId.isValid(trimmedTipoOpcionId)) throw new Error(`Formato Tipo Opcion Id incorrecto: ${trimmedTipoOpcionId}`);
    

    this.tipoOpcion = new Types.ObjectId(trimmedTipoOpcionId);
    this.nombre = nombre.trim().toUpperCase();
    this.codigo = codigo.trim().toUpperCase();
    this.usuarioCreacion = (usuarioCreacion && Types.ObjectId.isValid(usuarioCreacion))
      ? new Types.ObjectId(usuarioCreacion)
      : null;
  }
}

module.exports = CrearOpcionesInDTO;