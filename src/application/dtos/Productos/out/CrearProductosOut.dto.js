class CrearProductosOutDTO {
  constructor(producto) {
    this.id       = producto.id;
    this.nombre     = producto.nombre;
    this.estado     = producto.estado;
    this.tieneTalla     = producto.tieneTalla;
    this.tieneColor     = producto.tieneColor;
  }

  static fromEntity(producto) {
    return new CrearProductosOutDTO(producto);
  }


}
module.exports = CrearProductosOutDTO;