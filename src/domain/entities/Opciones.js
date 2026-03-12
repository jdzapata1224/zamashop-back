class Opciones {
  constructor({
    id,
    nombre,
    codigo,
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
    this.codigo     = codigo;
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
module.exports = Opciones;