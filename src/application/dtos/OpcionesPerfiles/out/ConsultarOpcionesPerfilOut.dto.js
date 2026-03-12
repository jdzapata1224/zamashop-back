class ConsultarOpcionesPerfilOutDTO {
  constructor(opcionPerfil) {
    this.id               = opcionPerfil.id;
    this.nombre           = opcionPerfil.nombre;
    this.codigo           = opcionPerfil.codigo;
    this.tipoOpcion = opcionPerfil.tipoOpcion;
    this.hijos            = (opcionPerfil.hijos || []).map(h => ({
      id:               h.id,
      nombre:           h.nombre,
      codigo:           h.codigo,
      tipoOpcion:     h.tipoOpcion
    }));
  }

  static fromEntity(opcionPerfil) {
    return new ConsultarOpcionesPerfilOutDTO(opcionPerfil);
  }

  static fromEntities(opcionesPerfil) {
    return opcionesPerfil.map(ou => new ConsultarOpcionesPerfilOutDTO(ou));
  }
}

module.exports = ConsultarOpcionesPerfilOutDTO;