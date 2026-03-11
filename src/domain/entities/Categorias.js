class Categorias {
  constructor({
    id,
    nombre,
    descripcion,
    estado,
    fechaCreacion,
    usuarioCreacion,
    fechaActualizacion,
    usuarioActualizacion,
    fechaEliminacion,
    usuarioEliminacion,
  }) {
    this.id             = id;
    this.nombre        = nombre;
    this.estado   = estado;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacion       = usuarioCreacion;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacion       = usuarioActualizacion;
    this.fechaEliminacion  = fechaEliminacion;
    this.usuarioEliminacion       = usuarioEliminacion;
  }

}
module.exports = Categorias;