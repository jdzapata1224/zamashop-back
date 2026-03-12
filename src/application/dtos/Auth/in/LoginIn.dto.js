const { requireString }  = require('../../../../infrastructure/utils/validate.util');
const { trimmedString }  = require('../../../../infrastructure/utils/basic.util');

class LoginInDTO {
  constructor({ usuario, password }) {
    requireString(usuario, 'Nombre');
    requireString(password, 'Password');

    this.usuario  = trimmedString(usuario);
    this.password = trimmedString(password);
  }
}

module.exports = LoginInDTO;
