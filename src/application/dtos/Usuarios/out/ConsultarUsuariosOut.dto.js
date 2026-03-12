class ConsultarUsuariosOutDTO {
  constructor(user) {
    this.id = user.id;
    this.primer_nombre = user.primer_nombre;
    this.segundo_nombre = user.segundo_nombre;
    this.primer_apellido = user.primer_apellido;
    this.segundo_apellido = user.segundo_apellido;
    this.identificacion = user.identificacion;
    this.perfilId = user.perfilId;
    this.perfilNombre = user.perfilNombre;
    this.correo = user.correo;
    this.estado = user.estado;
    this.telefono = user.telefono;
    this.usuario = user.usuario;
    this.usuarioCreacionId = user.usuarioCreacionId;
    this.usuarioCreacionNombre = user.usuarioCreacionNombre;
    this.fechaCreacion = user.fechaCreacion;
    this.usuarioActualizacionId = user.usuarioActualizacionId;
    this.usuarioActualizacionNombre = user.usuarioActualizacionNombre;
    this.fechaActualizacion = user.fechaActualizacion;
    this.usuarioEliminacionId    = user.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = user.usuarioEliminacionNombre;
    this.fechaEliminacion    = user.fechaEliminacion;
  }

  static fromEntity(user) {
    return new ConsultarUsuariosOutDTO(user);
  }

  static fromEntities(users) {
    return users.map(user => new ConsultarUsuariosOutDTO(user));
  }
}
module.exports = ConsultarUsuariosOutDTO;