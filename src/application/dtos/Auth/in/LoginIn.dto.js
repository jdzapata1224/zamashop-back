const { requireString }  = require('../../../../infrastructure/utils/validate.util');
const { trimmedString }  = require('../../../../infrastructure/utils/basic.util');

class LoginInDTO {
  constructor({ usuario, clave }) {
    requireString(usuario, 'Usuario');
    requireString(clave, 'Password');

    this.usuario  = trimmedString(usuario);
    this.password = trimmedString(clave);
  }
}

module.exports = LoginInDTO;
