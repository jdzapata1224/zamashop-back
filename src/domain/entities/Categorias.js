class Categorias {
  constructor({
    id,
    nombre,
    descripcion,  
    estado,
    fechaCreacion,
    usuarioCreacionId,
    usuarioCreacionNombre,
    fechaActualizacion,
    usuarioActualizacionId,
    usuarioActualizacionNombre,
    fechaEliminacion,
    usuarioEliminacionId,
    usuarioEliminacionNombre,
  }) {
    this.id             = id;
    this.nombre        = nombre;
    this.descripcion   = descripcion;
    this.estado   = estado;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacionId       = usuarioCreacionId;
    this.usuarioCreacionNombre       = usuarioCreacionNombre;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacionId       = usuarioActualizacionId;
    this.usuarioActualizacionNombre       = usuarioActualizacionNombre;
    this.fechaEliminacion  = fechaEliminacion;
    this.usuarioEliminacionId       = usuarioEliminacionId;
    this.usuarioEliminacionNombre       = usuarioEliminacionNombre;
  }

}
module.exports = Categorias;