class ConsultarOpcionesPerfilOutDTO {
  constructor(opcionPerfil) {
    this.id               = opcionPerfil.id;
    this.nombre           = opcionPerfil.nombre;
    this.codigo           = opcionPerfil.codigo;
    this.tipoOpcionId     = opcionPerfil.tipoOpcionId;
    this.tipoOpcionNombre = opcionPerfil.tipoOpcionNombre;
    this.hijos            = (opcionPerfil.hijos || []).map(h => ({
      id:               h.id,
      nombre:           h.nombre,
      codigo:           h.codigo,
      tipoOpcionId:     h.tipoOpcionId,
      tipoOpcionNombre: h.tipoOpcionNombre,
    }));
  }

  static fromEntity(opcionPerfil) {
    return new ConsultarOpcionesPerfilOutDTO(opcionPerfil);
  }

  static fromEntities(opcionesUsuario) {
    return opcionesUsuario.map(ou => new ConsultarOpcionesPerfilOutDTO(ou));
  }
}

module.exports = ConsultarOpcionesPerfilOutDTO;