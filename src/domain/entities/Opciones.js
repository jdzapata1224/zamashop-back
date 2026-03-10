class Opciones {
  constructor({
    id,
    nombre,
    codigo,
    estado,
    perfilId,
    fechaCreacion,
    usuarioCreacion,
    fechaActualizacion,
    usuarioActualizacion,
    fechaEliminacion,
    usuarioEliminacion,
  }) {
    this.id             = id;
    this.nombre        = nombre;
    this.codigo     = codigo;
    this.estado   = estado;
    this.fechaCreacion  = fechaCreacion;
    this.usuarioCreacion       = usuarioCreacion;
    this.fechaActualizacion  = fechaActualizacion;
    this.usuarioActualizacion       = usuarioActualizacion;
    this.fechaEliminacion  = fechaEliminacion;
    this.usuarioEliminacion       = usuarioEliminacion;
  }

}
module.exports = Opciones;