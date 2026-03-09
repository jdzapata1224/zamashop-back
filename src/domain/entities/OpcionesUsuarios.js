class OpcionesUsuarios {
  constructor({ id, usuarioId, opcionId, fechaCreacion, usuarioCreacion }) {
    this.id              = id;
    this.usuarioId       = usuarioId;
    this.opcionId        = opcionId;
    this.fechaCreacion   = fechaCreacion;
    this.usuarioCreacion = usuarioCreacion;
  }
}

module.exports = OpcionesUsuarios;
