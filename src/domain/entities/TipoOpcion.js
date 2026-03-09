class TipoOpcion {
  constructor({ id, nombre, fechaCreacion, usuarioCreacion }) {
    this.id              = id;
    this.nombre       = nombre;
    this.fechaCreacion   = fechaCreacion;
    this.usuarioCreacion = usuarioCreacion;
  }
}

module.exports = TipoOpcion;
