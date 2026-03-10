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
    perfilId,
    perfilNombre,
    fechaCreacion,
    usuarioCreacion,
    usuarioActualizacion,
    fechaActualizacion,
    usuarioEliminacion,
    fechaEliminacion,
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
    this.perfilId           = perfilId   ?? null;
    this.perfilNombre       = perfilNombre ?? null;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacion       = usuarioCreacion;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacion       = usuarioActualizacion;
    this.fechaEliminacion  = fechaEliminacion;
    this.usuarioEliminacion       = usuarioEliminacion;
  }

}

module.exports = Usuarios;