class LoginOutDTO {
  constructor({ id, usuario, primer_nombre, primer_apellido, correo, token ,emitido,expira}) {
    this.id             = id;
    this.usuario        = usuario;
    this.primer_nombre  = primer_nombre;
    this.primer_apellido = primer_apellido;
    this.correo         = correo;
    this.token          = token;
    this.emitido          = emitido;
    this.expira          = expira;
  }
}

module.exports = LoginOutDTO;
