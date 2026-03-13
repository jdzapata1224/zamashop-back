class ConsultarProductoVariacionOutDTO {
  constructor(productoVariacion) {
    this.id       = productoVariacion.id;
    this.codigo     = productoVariacion.nombre;
    this.estado     = productoVariacion.estado;
    this.stock     = productoVariacion.stock;
    this.precio     = productoVariacion.precio;
    this.tallaId     = productoVariacion.tallaId;
    this.tallaNombre     = productoVariacion.tallaNombre;
    this.colorId     = productoVariacion.colorId;
    this.colorNombre     = productoVariacion.colorNombre;
    this.productoId     = productoVariacion.productoId;
    this.productoNombre     = productoVariacion.productoNombre;
    
    this.usuarioCreacionId    = productoVariacion.usuarioCreacionId;
    this.usuarioCreacionNombre    = productoVariacion.usuarioCreacionNombre;
    this.fechaCreacion    = productoVariacion.fechaCreacion;
    this.usuarioActualizacionId    = productoVariacion.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = productoVariacion.usuarioActualizacionNombre;
    this.fechaActualizacion    = productoVariacion.fechaActualizacion;
    this.usuarioEliminacionId    = productoVariacion.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = productoVariacion.usuarioEliminacionNombre;
    this.fechaEliminacion    = productoVariacion.fechaEliminacion;
  }

  static fromEntity(producto) {
    return new ConsultarProductoVariacionOutDTO(producto);
  }

static fromEntities(productos) {
  return productos.map(producto => new ConsultarProductoVariacionOutDTO(producto));
}
}
module.exports = ConsultarProductoVariacionOutDTO;