class ConsultarUsuariosOutDTO {
  constructor(user) {
    this.id       = user.id;
    this.nombres     = user.nombres;
    this.apellidos    = user.apellidos;
    this.identificacion =user.identificacion;
    this.correo    = user.correo;
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
}
module.exports = ConsultarUsuariosOutDTO;