class CrearPerfilesOutDTO {
  constructor(perfil) {
    this.id       = perfil.id;
    this.nombre     = perfil.nombre;
    this.codigo     = perfil.codigo;
    this.estado     = perfil.estado;

  }

  static fromEntity(perfil) {
    return new CrearPerfilesOutDTO(perfil);
  }

}
module.exports = CrearPerfilesOutDTO;