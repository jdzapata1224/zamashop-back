const { trimmedString }  = require('../../../../infrastructure/utils/basic.util');

class LoginOutDTO {
  constructor(token) {
    this.token          = token;
    
  }
}

module.exports = LoginOutDTO;
