class ConsultarOpcionesOutDTO {
  constructor(opcion) {
    this.id       = opcion.id;
    this.nombre     = opcion.nombre;
    this.codigo     = opcion.codigo;
    this.estado     = opcion.estado;
    this.usuarioCreacion    = opcion.usuarioCreacion;
    this.fechaCreacion    = opcion.fechaCreacion;
    this.usuarioActualizacion    = opcion.usuarioActualizacion;
    this.fechaActualizacion    = opcion.fechaActualizacion;
    this.usuarioEliminacion    = opcion.usuarioEliminacion;
    this.fechaEliminacion    = opcion.fechaEliminacion;
    // password never exposed
  }

  static fromEntity(opcion) {
    return new ConsultarOpcionesOutDTO(opcion);
  }

static fromEntities(opciones) {
  return opciones.map(opcion => new ConsultarOpcionesOutDTO(opcion));
}
}
module.exports = ConsultarOpcionesOutDTO;