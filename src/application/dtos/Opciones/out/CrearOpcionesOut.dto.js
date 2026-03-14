class CrearOpcionesOutDTO {
  constructor(opcion) {
    this.id                         = opcion.id;
    this.nombre                     = opcion.nombre;
    this.codigo                     = opcion.codigo;
    this.estado                     = opcion.estado;

  }

  static fromEntity(opcion) {
    return new CrearOpcionesOutDTO(opcion);
  }

}
module.exports = CrearOpcionesOutDTO;