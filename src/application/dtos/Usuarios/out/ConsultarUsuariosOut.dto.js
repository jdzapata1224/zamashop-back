class ConsultarUsuariosOutDTO {
  constructor(user) {
    this.id       = user.id;
    this.primer_nombre     = user.primer_nombre;
    this.segundo_nombre     = user.segundo_nombre;
    this.primer_apellido    = user.primer_apellido;
    this.segundo_apellido   = user.segundo_apellido;
    this.identificacion =user.identificacion;
    this.correo    = user.correo;
    this.estado    = user.estado;
    this.telefono    = user.telefono;
    this.usuario    = user.usuario;
    this.usuarioCreacion    = user.usuarioCreacion;
    this.fechaCreacion    = user.fechaCreacion;
    this.usuarioActualizacion    = user.usuarioActualizacion;
    this.fechaActualizacion    = user.fechaActualizacion;
    this.usuarioEliminacion    = user.usuarioEliminacion;
    this.fechaEliminacion    = user.fechaEliminacion;
    // password never exposed
  }

  static fromEntity(user) {
    return new ConsultarUsuariosOutDTO(user);
  }

static fromEntities(users) {
  return users.map(user => new ConsultarUsuariosOutDTO(user));
}
}
module.exports = ConsultarUsuariosOutDTO;