class ConsultarColoresOutDTO {
  constructor(color) {
    this.id       = color.id;
    this.nombre     = color.nombre;
    this.hex     = color.hex;
    this.estado     = color.estado;
    this.usuarioCreacionId    = color.usuarioCreacionId;
    this.usuarioCreacionNombre    = color.usuarioCreacionNombre;
    this.fechaCreacion    = color.fechaCreacion;
    this.usuarioActualizacionId    = color.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = color.usuarioActualizacionNombre;
    this.fechaActualizacion    = color.fechaActualizacion;
    this.usuarioEliminacionId    = color.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = color.usuarioEliminacionNombre;
    this.fechaEliminacion    = color.fechaEliminacion;
  }

  static fromEntity(color) {
    return new ConsultarColoresOutDTO(color);
  }

static fromEntities(colores) {
  return colores.map(color => new ConsultarColoresOutDTO(color));
}
}
module.exports = ConsultarColoresOutDTO;