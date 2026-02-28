class ConsultarUsuariosOutDTO {
  constructor(user) {
    this.id       = user.id;
    this.nombres     = user.nombres;
    this.apellidos    = user.apellidos;
    // password never exposed
  }

  static fromEntity(user) {
    return new ConsultarUsuariosOutDTO(user);
  }
}
module.exports = ConsultarUsuariosOutDTO;