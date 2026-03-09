const { Types } = require('mongoose');

class CrearOpcionesInDTO {
  constructor({ nombre,codigo,usuarioCreacion }) {
    if (!nombre        || typeof nombre        !== 'string' || !nombre.trim())        throw new Error('Nombre es requerido');   
    if (!codigo      || typeof codigo      !== 'string' || !codigo.trim())      throw new Error('codigo es requerido');
    
    this.nombre = nombre.trim().toUpperCase();
    this.codigo = codigo.trim().toUpperCase();
    this.usuarioCreacion = (usuarioCreacion && Types.ObjectId.isValid(usuarioCreacion))
      ? new Types.ObjectId(usuarioCreacion)
      : null;
  }
}

module.exports = CrearOpcionesInDTO;