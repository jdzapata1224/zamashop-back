class OpcionesUsuarios {
  constructor({ id, nombre, codigo, tipoOpcionId, tipoOpcionNombre, hijos }) {
    this.id               = id;
    this.nombre           = nombre;
    this.codigo           = codigo;
    this.tipoOpcionId     = tipoOpcionId;
    this.tipoOpcionNombre = tipoOpcionNombre;
    this.hijos            = hijos || [];
  }
}

module.exports = OpcionesUsuarios;