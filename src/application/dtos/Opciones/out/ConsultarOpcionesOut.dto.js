class ConsultarOpcionesOutDTO {
  constructor(opcion) {
    this.id       = opcion.id;
    this.nombre     = opcion.nombre;
    this.codigo     = opcion.codigo;
    this.estado     = opcion.estado;
    this.usuarioCreacionId    = opcion.usuarioCreacionId;
    this.usuarioCreacionNombre    = opcion.usuarioCreacionNombre;
    this.fechaCreacion    = opcion.fechaCreacion;
    this.usuarioActualizacionId    = opcion.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = opcion.usuarioActualizacionNombre;
    this.fechaActualizacion    = opcion.fechaActualizacion;
    this.usuarioEliminacionId    = opcion.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = opcion.usuarioEliminacionNombre;
    this.fechaEliminacion    = opcion.fechaEliminacion;
  }

  static fromEntity(opcion) {
    return new ConsultarOpcionesOutDTO(opcion);
  }

static fromEntities(opciones) {
  return opciones.map(opcion => new ConsultarOpcionesOutDTO(opcion));
}
}
module.exports = ConsultarOpcionesOutDTO;