const { Types } = require('mongoose');

class CrearUsuarioInDTO {
  constructor({ primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, usuario, password, identificacion, correo, telefono, token }) {
    if (!primer_nombre        || typeof primer_nombre        !== 'string' || !primer_nombre.trim())        throw new Error('Primer Nombre es requerido');
    
    if (!primer_apellido      || typeof primer_apellido      !== 'string' || !primer_apellido.trim())      throw new Error('apellidos es requerido');
    if (!usuario        || typeof usuario        !== 'string' || !usuario.trim())        throw new Error('usuario es requerido');
    if (!password       || typeof password       !== 'string' || !password.trim())       throw new Error('password es requerido');
    if (!identificacion || typeof identificacion !== 'string' || !identificacion.trim()) throw new Error('identificacion es requerida');
    if (!correo         || typeof correo         !== 'string' || !correo.trim())         throw new Error('correo es requerido');
    if (!telefono       || typeof telefono       !== 'string' || !telefono.trim())       throw new Error('telefono es requerido');
    
    if (segundo_nombre  !== undefined && segundo_nombre  !== null && typeof segundo_nombre  !== 'string') throw new Error('Segundo nombre debe ser texto');
    if (segundo_apellido !== undefined && segundo_apellido !== null && typeof segundo_apellido !== 'string') throw new Error('Segundo apellido debe ser texto');

    this.primer_nombre      = primer_nombre.trim();
    this.segundo_nombre   = segundo_nombre?.trim()   || null;
    this.primer_apellido    = primer_apellido.trim();
    this.segundo_apellido = segundo_apellido?.trim() || null;
    this.usuario        = usuario.trim();
    this.password       = password.trim();
    this.identificacion = identificacion.trim();
    this.correo         = correo.trim().toLowerCase();
    this.telefono       = telefono.trim();
    this.usuarioCreacion = null;
    if (token) {
      const bearer = String(token).startsWith('Bearer ')
        ? token.slice(7).trim()
        : token.trim();
      if (Types.ObjectId.isValid(bearer)) {
        this.usuarioCreacion = new Types.ObjectId(bearer);;
      }
    }
  }
}

module.exports = CrearUsuarioInDTO;