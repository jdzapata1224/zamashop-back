class TipoOpcion {
  constructor({ id, nombre,codigo, fechaCreacion, usuarioCreacion }) {
    this.id              = id;
    this.nombre       = nombre;
    this.codigo       = codigo;
    this.fechaCreacion   = fechaCreacion;
    this.usuarioCreacion = usuarioCreacion;
  }
}

module.exports = TipoOpcion;
