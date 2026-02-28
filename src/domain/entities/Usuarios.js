class Usuarios {
  constructor({
    id,
    nombres,
    apellidos,
    usuario,
    password,
    identificacion,
    correo,
    telefono,
    estado,
    fechaCreacion,
    creacion,
  }) {
    this.id             = id;
    this.nombres        = nombres;
    this.apellidos      = apellidos;
    this.usuario        = usuario;
    this.password       = password;
    this.identificacion = identificacion;
    this.correo         = correo;
    this.telefono       = telefono;
    this.estado         = estado;
    this.fechaCreacion  = fechaCreacion;
    this.creacion       = creacion;
  }

}

module.exports = Usuarios;