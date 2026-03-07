class CrearUsuarioInDTO {
  constructor({ primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, usuario, password, identificacion, correo, telefono, usuarioCreacion }) {
    if (!primer_nombre        || typeof primer_nombre        !== 'string' || !primer_nombre.trim())        throw new Error('Primer Nombre es requerido');
    if (typeof segundo_nombre        !== 'string' || !segundo_nombre.trim())        throw new Error('Segundo Nombre es requerido');

    if (!primer_apellido      || typeof primer_apellido      !== 'string' || !primer_apellido.trim())      throw new Error('apellidos es requerido');
    if (typeof segundo_apellido      !== 'string' || !segundo_apellido.trim())      throw new Error('Segundo Apellido es requerido');

    if (!usuario        || typeof usuario        !== 'string' || !usuario.trim())        throw new Error('usuario es requerido');
    if (!password       || typeof password       !== 'string' || !password.trim())       throw new Error('password es requerido');
    if (!identificacion || typeof identificacion !== 'string' || !identificacion.trim()) throw new Error('identificacion es requerida');
    if (!correo         || typeof correo         !== 'string' || !correo.trim())         throw new Error('correo es requerido');
    if (!telefono       || typeof telefono       !== 'string' || !telefono.trim())       throw new Error('telefono es requerido');

    this.primer_nombre      = primer_nombre.trim();
    this.segundo_nombre   = segundo_nombre?.trim()   || null;
    this.primer_apellido    = primer_apellido.trim();
    this.segundo_apellido = segundo_apellido?.trim() || null;
    this.usuario        = usuario.trim();
    this.password       = password.trim();
    this.identificacion = identificacion.trim();
    this.correo         = correo.trim().toLowerCase();
    this.telefono       = telefono.trim();
    this.usuarioCreacion = usuarioCreacion ?? null;
  }
}

module.exports = CrearUsuarioInDTO;