class ConsultarUsuariosOutDTO {
  constructor(user) {
    this.id       = user.id;
    this.nombres     = user.nombres;
    this.apellidos    = user.apellidos;
    this.identificacion =user.identificacion;
    this.correo    = user.correo;
    this.telefono    = user.telefono;
    this.usuario    = user.usuario;
    // password never exposed
  }

  static fromEntity(user) {
    return new ConsultarUsuariosOutDTO(user);
  }
}
module.exports = ConsultarUsuariosOutDTO;