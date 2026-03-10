const { Types } = require('mongoose');

class CrearUsuarioInDTO {
  constructor({ perfil,primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, password, identificacion, correo, telefono, usuarioCreacion }) {
    if (!primer_nombre        || typeof primer_nombre        !== 'string' || !primer_nombre.trim())        throw new Error('Primer Nombre es requerido');   
    if (!primer_apellido      || typeof primer_apellido      !== 'string' || !primer_apellido.trim())      throw new Error('apellidos es requerido');
    if (!password       || typeof password       !== 'string' || !password.trim())       throw new Error('password es requerido');
    if (!identificacion || typeof identificacion !== 'string' || !identificacion.trim()) throw new Error('identificacion es requerida');
    if (!correo         || typeof correo         !== 'string' || !correo.trim())         throw new Error('correo es requerido');
    if (!telefono       || typeof telefono       !== 'string' || !telefono.trim())       throw new Error('telefono es requerido');
    
    if (!usuarioCreacion || !Types.ObjectId.isValid(usuarioCreacion)) throw new Error('usuarioCreacion es requerido y debe ser un Id válido');
    if (!perfil || !Types.ObjectId.isValid(perfil)) throw new Error('perfil es requerido y debe ser un Id válido');

    if (segundo_nombre  !== undefined && segundo_nombre  !== null && typeof segundo_nombre  !== 'string') throw new Error('Segundo nombre debe ser texto');
    if (segundo_apellido !== undefined && segundo_apellido !== null && typeof segundo_apellido !== 'string') throw new Error('Segundo apellido debe ser texto');

    this.perfil = new Types.ObjectId(perfil);
    this.primer_nombre      = primer_nombre.trim().toUpperCase();
    this.segundo_nombre   = segundo_nombre?.trim().toUpperCase()   || null;
    this.primer_apellido    = primer_apellido.trim().toUpperCase();
    this.segundo_apellido = segundo_apellido?.trim().toUpperCase() || null;
    this.usuarioBase = `${this.primer_nombre.charAt(0)}${this.primer_apellido}`.toLowerCase();
    this.usuario     = this.usuarioBase; // puede ser sobreescrito en el use-case
    this.password       = password.trim();
    this.identificacion = identificacion.trim();
    this.correo         = correo.trim().toLowerCase();
    this.telefono       = telefono.trim();
    this.usuarioCreacion  = new Types.ObjectId(usuarioCreacion);
  }
}

module.exports = CrearUsuarioInDTO;