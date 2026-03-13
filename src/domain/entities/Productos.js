class Categorias {
  constructor({
    id,
    nombre,
    codigo,
    descripcion,  
    estado,
    tieneColor,
    tieneTalla,
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
    this.codigo        = codigo;
    this.descripcion   = descripcion;
    this.estado   = estado;
    this.tieneColor   = tieneColor;
    this.tieneTalla   = tieneTalla;
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