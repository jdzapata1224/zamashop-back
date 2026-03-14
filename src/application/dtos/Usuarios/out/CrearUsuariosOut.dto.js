class ConsultarUsuariosOutDTO {
  constructor(usuario) {
    this.id = usuario.id;
    this.primer_nombre = usuario.primer_nombre;
    this.segundo_nombre = usuario.segundo_nombre;
    this.primer_apellido = usuario.primer_apellido;
    this.segundo_apellido = usuario.segundo_apellido;
    this.identificacion = usuario.identificacion;
    this.estado = usuario.estado;
    this.usuario = usuario.usuario;
  }

  static fromEntity(usuario) {
    return new ConsultarUsuariosOutDTO(usuario);
  }

  
}
module.exports = ConsultarUsuariosOutDTO;