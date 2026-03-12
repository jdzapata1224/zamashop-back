class ConsultarCategoriasOutDTO {
  constructor(categoria) {
    this.id       = categoria.id;
    this.nombre     = categoria.nombre;
    this.descripcion     = categoria.descripcion;
    this.estado     = categoria.estado;
    this.usuarioCreacion    = categoria.usuarioCreacion;
    this.fechaCreacion    = categoria.fechaCreacion;
    this.usuarioActualizacion    = categoria.usuarioActualizacion;
    this.fechaActualizacion    = categoria.fechaActualizacion;
    this.usuarioEliminacion    = categoria.usuarioEliminacion;
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