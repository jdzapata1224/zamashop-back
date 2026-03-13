class ConsultarCategoriasOutDTO {
  constructor(categoria) {
    this.id       = categoria.id;
    this.nombre     = categoria.nombre;
    this.descripcion     = categoria.descripcion;
    this.estado     = categoria.estado;
    this.usuarioCreacionId    = categoria.usuarioCreacionId;
    this.usuarioCreacionNombre    = categoria.usuarioCreacionNombre;
    this.fechaCreacion    = categoria.fechaCreacion;
    this.usuarioActualizacionId    = categoria.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = categoria.usuarioActualizacionNombre;
    this.fechaActualizacion    = categoria.fechaActualizacion;
    this.usuarioEliminacionId    = categoria.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = categoria.usuarioEliminacionNombre;
    this.fechaEliminacion    = categoria.fechaEliminacion;
  }

  static fromEntity(categoria) {
    return new ConsultarCategoriasOutDTO(categoria);
  }

static fromEntities(categorias) {
  return categorias.map(categoria => new ConsultarCategoriasOutDTO(categoria));
}
}
module.exports = ConsultarCategoriasOutDTO;