class Categorias {
  constructor({
    id,
    productoId,
    productoNombre,
    tallaId,
    tallaNombre,
    colorId,
    colorNombre,
    stock,
    precio,
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
    this.codigo        = codigo;
    this.productoId   = productoId;
    this.productoNombre   = productoNombre;
    this.tallaId   = tallaId;
    this.tallaNombre   = tallaNombre;
    this.colorId   = colorId;
    this.colorNombre   = colorNombre;
    this.stock   = stock;
    this.estado   = estado;
    this.precio   = precio;
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