const { trimmedString }  = require('../../../../infrastructure/utils/basic.util');

class LoginOutDTO {
  constructor({ id, usuario, primer_nombre, primer_apellido, correo, token ,fechaEmision,fechaExpiracion}) {
    this.id             = id;
    this.usuario        = usuario;
    this.primer_nombre  = primer_nombre;
    this.primer_apellido = primer_apellido;
    this.correo         = correo;
    this.token          = token;
    this.fechaEmision          = fechaEmision;
    this.fechaExpiracion          = fechaExpiracion;
  }
}

module.exports = LoginOutDTO;
