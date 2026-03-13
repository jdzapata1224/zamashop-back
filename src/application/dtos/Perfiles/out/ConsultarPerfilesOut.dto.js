class ConsultarPerfilesOutDTO {
  constructor(perfil) {
    this.id       = perfil.id;
    this.nombre     = perfil.nombre;
    this.codigo     = perfil.codigo;
    this.estado     = perfil.estado;
    this.usuarioCreacionId    = perfil.usuarioCreacionId;
    this.usuarioCreacionNombre    = perfil.usuarioCreacionNombre;
    this.fechaCreacion    = perfil.fechaCreacion;
    this.usuarioActualizacionId    = perfil.usuarioActualizacionId;
    this.usuarioActualizacionNombre    = perfil.usuarioActualizacionNombre;
    this.fechaActualizacion    = perfil.fechaActualizacion;
    this.usuarioEliminacionId    = perfil.usuarioEliminacionId;
    this.usuarioEliminacionNombre    = perfil.usuarioEliminacionNombre;
    this.fechaEliminacion    = perfil.fechaEliminacion;
  }

  static fromEntity(perfil) {
    return new ConsultarPerfilesOutDTO(perfil);
  }

static fromEntities(perfiles) {
  return perfiles.map(perfil => new ConsultarPerfilesOutDTO(perfil));
}
}
module.exports = ConsultarPerfilesOutDTO;