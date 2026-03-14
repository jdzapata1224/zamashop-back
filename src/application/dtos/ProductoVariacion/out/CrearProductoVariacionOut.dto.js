class ConsultarProductoVariacionOutDTO {
  constructor(productoVariacion) {
    this.id       = productoVariacion.id;
    this.codigo     = productoVariacion.nombre;
    this.estado     = productoVariacion.estado;
  }

  static fromEntity(producto) {
    return new ConsultarProductoVariacionOutDTO(producto);
  }

}
module.exports = ConsultarProductoVariacionOutDTO;