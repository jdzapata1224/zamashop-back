class Usuarios {
  constructor({
    id,
    nombres,
    apellidos,
    usuario,
    password,
    identificacion,
    correo,
    telefono,
    estado,
    fechaCreacion,
    usuarioCreacion,
    usuarioActualizacion,
    fechaActualizacion,
    usuarioEliminacion,
    fechaEliminacion,
  }) {
    this.id             = id;
    this.nombres        = nombres;
    this.apellidos      = apellidos;
    this.usuario        = usuario;
    this.password       = password;
    this.identificacion = identificacion;
    this.correo         = correo;
    this.telefono       = telefono;
    this.estado         = estado;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacion       = usuarioCreacion;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacion       = usuarioActualizacion;
    this.fechaEliminacion  = fechaEliminacion;
    this.usuarioEliminacion       = usuarioEliminacion;
  }

}

module.exports = Usuarios;