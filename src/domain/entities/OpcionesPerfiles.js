class OpcionesPerfiles {
  constructor({ id, perfilId, opcionId, fechaCreacion, usuarioCreacion }) {
    this.id              = id;
    this.perfilId       = perfilId;
    this.opcionId        = opcionId;
    this.fechaCreacion   = fechaCreacion;
    this.usuarioCreacion = usuarioCreacion;
  }
}

module.exports = OpcionesPerfiles;
