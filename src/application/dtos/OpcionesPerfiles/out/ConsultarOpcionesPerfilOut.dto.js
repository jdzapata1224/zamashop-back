class ConsultarOpcionesPerfilOutDTO {
  constructor(opcionPerfil) {
    this.id               = opcionPerfil.id;
    this.perfilId        = opcionPerfil.perfilId;
    this.opcionId         = opcionPerfil.opcionId;
    this.fechaCreacion    = opcionPerfil.fechaCreacion;
    this.usuarioCreacion  = opcionPerfil.usuarioCreacion;
  }

  static fromEntity(opcionPerfil) {
    return new ConsultarOpcionesPerfilOutDTO(opcionPerfil);
  }

  static fromEntities(opcionPerfil) {
    return opcionPerfil.map(ou => new ConsultarOpcionesPerfilOutDTO(ou));
  }
}

module.exports = ConsultarOpcionesPerfilOutDTO;