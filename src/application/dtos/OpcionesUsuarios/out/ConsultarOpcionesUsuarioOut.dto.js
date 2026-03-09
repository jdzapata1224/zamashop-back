class ConsultarOpcionesUsuarioOutDTO {
  constructor(opcionUsuario) {
    this.id               = opcionUsuario.id;
    this.usuarioId        = opcionUsuario.usuarioId;
    this.opcionId         = opcionUsuario.opcionId;
    this.opcionNombre         = opcionUsuario.opcionNombre;
    this.tipoOpcionId         = opcionUsuario.tipoOpcionId;
    this.tipoOpcionNombre         = opcionUsuario.tipoOpcionNombre;
    this.fechaCreacion    = opcionUsuario.fechaCreacion;
    this.usuarioCreacion  = opcionUsuario.usuarioCreacion;
  }

  static fromEntity(opcionUsuario) {
    return new ConsultarOpcionesUsuarioOutDTO(opcionUsuario);
  }

  static fromEntities(opcionesUsuario) {
    return opcionesUsuario.map(ou => new ConsultarOpcionesUsuarioOutDTO(ou));
  }
}

module.exports = ConsultarOpcionesUsuarioOutDTO;