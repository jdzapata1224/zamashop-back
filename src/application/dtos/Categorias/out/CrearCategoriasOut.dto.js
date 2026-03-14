class CrearCategoriasOutDTO {
  constructor(categoria) {
    this.id       = categoria.id;
    this.nombre     = categoria.nombre;
    this.descripcion     = categoria.descripcion;
    this.estado     = categoria.estado;
  }

  static fromEntity(categoria) {
    return new CrearCategoriasOutDTO(categoria);
  }

}
module.exports = CrearCategoriasOutDTO;