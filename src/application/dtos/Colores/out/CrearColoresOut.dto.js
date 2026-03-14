class ConsultarColoresOutDTO {
  constructor(color) {
    this.id       = color.id;
    this.nombre     = color.nombre;
    this.hex     = color.hex;
    this.estado     = color.estado;
  }

  static fromEntity(color) {
    return new ConsultarColoresOutDTO(color);
  }


}
module.exports = ConsultarColoresOutDTO;