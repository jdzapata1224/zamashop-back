class ConsultarProductosOutDTO {
  constructor(producto) {
    this.id       = producto.id;
    this.nombre     = producto.nombre;
    this.descripcion     = producto.descripcion;
    this.estado     = producto.estado;
    this.categoriaId     = producto.categoriaId;
    this.categoriaNombre     = producto.categoriaNombre;
    this.tieneTalla     = producto.tieneTalla;
    this.tieneColor     = producto.tieneColor;
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
module.exports = ConsultarProductosOutDTO;