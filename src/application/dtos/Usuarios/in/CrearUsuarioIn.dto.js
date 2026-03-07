class CrearUsuarioInDTO {
  constructor({ nombres, apellidos, usuario, password, identificacion, correo, telefono, usuarioCreacion }) {
    if (!nombres        || typeof nombres        !== 'string' || !nombres.trim())        throw new Error('nombres es requerido');
    if (!apellidos      || typeof apellidos      !== 'string' || !apellidos.trim())      throw new Error('apellidos es requerido');
    if (!usuario        || typeof usuario        !== 'string' || !usuario.trim())        throw new Error('usuario es requerido');
    if (!password       || typeof password       !== 'string' || !password.trim())       throw new Error('password es requerido');
    if (!identificacion || typeof identificacion !== 'string' || !identificacion.trim()) throw new Error('identificacion es requerida');
    if (!correo         || typeof correo         !== 'string' || !correo.trim())         throw new Error('correo es requerido');
    if (!telefono       || typeof telefono       !== 'string' || !telefono.trim())       throw new Error('telefono es requerido');

    this.nombres        = nombres.trim();
    this.apellidos      = apellidos.trim();
    this.usuario        = usuario.trim();
    this.password       = password.trim();
    this.identificacion = identificacion.trim();
    this.correo         = correo.trim().toLowerCase();
    this.telefono       = telefono.trim();
    this.usuarioCreacion = usuarioCreacion ?? null;
  }
}

module.exports = CrearUsuarioInDTO;