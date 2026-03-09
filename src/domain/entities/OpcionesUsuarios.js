class OpcionesUsuarios {
  constructor({ id, usuarioId, opcionId,opcionNombre, fechaCreacion, usuarioCreacion }) {
    this.id              = id;
    this.usuarioId       = usuarioId;
    this.opcionId        = opcionId;
    this.opcionNombre    = opcionNombre;
    this.fechaCreacion   = fechaCreacion;
    this.usuarioCreacion = usuarioCreacion;
  }
}

module.exports = OpcionesUsuarios;
