const { requireString } = require('../../../../infrastructure/utils/validate.util');

class CambiarClaveInDTO {
  constructor({ token,nuevaClave }) {

    requireString(token,          'Token');
    requireString(nuevaClave,        'Nueva Clave');
    
    this.token           = trimmedString(token);
    this.nuevaClave    = trimmedString(nuevaClave);

  }
}

module.exports = CambiarClaveInDTO;
