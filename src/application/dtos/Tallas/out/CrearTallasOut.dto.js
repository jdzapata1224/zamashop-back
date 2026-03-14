class CrearTallasOut {
  constructor(talla) {
    this.id       = talla.id;
    this.nombre     = talla.nombre;
    this.orden     = talla.orden;
    this.estado     = talla.estado;
    
  }

  static fromEntity(talla) {
    return new ConsultarTallasOutDTO(talla);
  }


}
module.exports = CrearTallasOut;