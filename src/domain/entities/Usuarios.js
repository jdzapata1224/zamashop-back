class Usuarios {
  constructor({
    id,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    usuario,
    password,
    identificacion,
    correo,
    telefono,
    estado,
    intentosFallidos,
    requiereCambioClave,
    perfilId,
    perfilNombre,
    fechaCreacion,
    usuarioCreacionId,
    usuarioCreacionNombre,
    usuarioActualizacionId,
    usuarioActualizacionNombre,
    fechaActualizacion
  }) {
    this.id             = id;
    this.primer_nombre        = primer_nombre;
    this.segundo_nombre     = segundo_nombre;
    this.primer_apellido    = primer_apellido;
    this.segundo_apellido   = segundo_apellido;
    this.usuario        = usuario;
    this.password       = password;
    this.identificacion = identificacion;
    this.correo         = correo;
    this.telefono       = telefono;
    this.estado         = estado;
    this.intentosFallidos    = intentosFallidos    ?? 0;
    this.requiereCambioClave = requiereCambioClave ?? false;
    this.perfilId           = perfilId   ?? null;
    this.perfilNombre       = perfilNombre ?? null;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacionId       = usuarioCreacionId;
    this.usuarioCreacionNombre       = usuarioCreacionNombre;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacionId       = usuarioActualizacionId;
    this.usuarioActualizacionNombre       = usuarioActualizacionNombre;
  }

}

module.exports = Usuarios;