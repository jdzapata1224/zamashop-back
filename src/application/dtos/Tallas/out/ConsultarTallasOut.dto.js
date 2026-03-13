class ConsultarTallasOutDTO {
  constructor(producto) {
    this.id       = producto.id;
    this.nombre     = producto.nombre;
    this.orden     = producto.orden;
    this.estado     = producto.estado;
    this.usuarioCreacionId    = producto.usuarioCreacionId;
    this.usuarioCreacionNombre    = producto.usuarioCreacionNombre;
    this.fechaCreacion    = producto.fechaCreacion;
    this.usuarioActualizacionId    = producto.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = producto.usuarioActualizacionNombre;
    this.fechaActualizacion    = producto.fechaActualizacion;
    this.usuarioEliminacionId    = producto.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = producto.usuarioEliminacionNombre;
    this.fechaEliminacion    = producto.fechaEliminacion;
  }

  static fromEntity(producto) {
    return new ConsultarProductosOutDTO(producto);
  }

static fromEntities(productos) {
  return productos.map(producto => new ConsultarProductosOutDTO(producto));
}
}
module.exports = ConsultarTallasOutDTO;