class ConsultarOpcionesUsuarioOutDTO {
  constructor(opcionUsuario) {
    this.id               = opcionUsuario.id;
    this.nombre           = opcionUsuario.nombre;
    this.codigo           = opcionUsuario.codigo;
    this.tipoOpcionId     = opcionUsuario.tipoOpcionId;
    this.tipoOpcionNombre = opcionUsuario.tipoOpcionNombre;
    this.hijos            = (opcionUsuario.hijos || []).map(h => ({
      id:               h.id,
      nombre:           h.nombre,
      codigo:           h.codigo,
      tipoOpcionId:     h.tipoOpcionId,
      tipoOpcionNombre: h.tipoOpcionNombre,
    }));
  }

  static fromEntity(opcionUsuario) {
    return new ConsultarOpcionesUsuarioOutDTO(opcionUsuario);
  }

  static fromEntities(opcionesUsuario) {
    return opcionesUsuario.map(ou => new ConsultarOpcionesUsuarioOutDTO(ou));
  }
}

module.exports = ConsultarOpcionesUsuarioOutDTO;