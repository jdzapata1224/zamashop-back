const { Types } = require('mongoose');

class ActualizarUsuarioInDTO {
  constructor({ id,primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, identificacion, correo, telefono, usuarioActualizacion }) {
    if (!id || !Types.ObjectId.isValid(id)) throw new Error('ID de usuario inválido o requerido');

    if (!primer_nombre        || typeof primer_nombre        !== 'string' || !primer_nombre.trim())        throw new Error('Primer Nombre es requerido');   
    if (!primer_apellido      || typeof primer_apellido      !== 'string' || !primer_apellido.trim())      throw new Error('apellidos es requerido');
    if (!identificacion || typeof identificacion !== 'string' || !identificacion.trim()) throw new Error('identificacion es requerida');
    if (!correo         || typeof correo         !== 'string' || !correo.trim())         throw new Error('correo es requerido');
    if (!telefono       || typeof telefono       !== 'string' || !telefono.trim())       throw new Error('telefono es requerido');
    if (!perfil || !Types.ObjectId.isValid(perfil)) throw new Error('perfil es requerido y debe ser un Id válido');
    if (!usuarioActualizacion || !Types.ObjectId.isValid(usuarioActualizacion)) throw new Error('usuarioActualizacion es requerido y debe ser un Id válido');

    if (segundo_nombre  !== undefined && segundo_nombre  !== null && typeof segundo_nombre  !== 'string') throw new Error('Segundo nombre debe ser texto');
    if (segundo_apellido !== undefined && segundo_apellido !== null && typeof segundo_apellido !== 'string') throw new Error('Segundo apellido debe ser texto');
    
    this.id             = new Types.ObjectId(id);
    this.primer_nombre      = primer_nombre.trim().toUpperCase();
    this.segundo_nombre   = segundo_nombre?.trim().toUpperCase()   || null;
    this.primer_apellido    = primer_apellido.trim().toUpperCase();
    this.segundo_apellido = segundo_apellido?.trim().toUpperCase() || null;
    this.identificacion = identificacion.trim();
    this.correo         = correo.trim().toLowerCase();
    this.telefono       = telefono.trim();
    this.perfil = new Types.ObjectId(perfil);
    this.usuarioActualizacion = new Types.ObjectId(usuarioActualizacion);
  }
}

module.exports = ActualizarUsuarioInDTO;