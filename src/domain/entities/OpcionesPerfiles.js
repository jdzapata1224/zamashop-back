class OpcionesPerfiles {
  constructor({ id, nombre, codigo, tipoOpcion, hijos }) {
    this.id               = id;
    this.nombre           = nombre;
    this.codigo           = codigo;
    this.tipoOpcion     = tipoOpcion;
    
    this.hijos            = hijos || [];
  }
}

module.exports = OpcionesPerfiles;