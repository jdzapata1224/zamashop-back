class ConsultarTallasOutDTO {
  constructor(talla) {
    this.id       = talla.id;
    this.nombre     = talla.nombre;
    this.orden     = talla.orden;
    this.estado     = talla.estado;
    this.usuarioCreacionId    = talla.usuarioCreacionId;
    this.usuarioCreacionNombre    = talla.usuarioCreacionNombre;
    this.fechaCreacion    = talla.fechaCreacion;
    this.usuarioActualizacionId    = talla.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = talla.usuarioActualizacionNombre;
    this.fechaActualizacion    = talla.fechaActualizacion;
    this.usuarioEliminacionId    = talla.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = talla.usuarioEliminacionNombre;
    this.fechaEliminacion    = talla.fechaEliminacion;
  }

  static fromEntity(talla) {
    return new ConsultarTallasOutDTO(talla);
  }

static fromEntities(tallas) {
  return tallas.map(talla => new ConsultarTallasOutDTO(talla));
}
}
module.exports = ConsultarTallasOutDTO;