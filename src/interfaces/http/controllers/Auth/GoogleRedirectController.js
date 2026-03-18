const { getGoogleAuthUrl } = require('../../../../infrastructure/services/GoogleAuthService');
const { randomUUID } = require('crypto');

class GoogleRedirectController {
  getUrl(req, res) {
     const url = getGoogleAuthUrl();
     res.status(200).json({
       codigo:  200,
       mensaje: 'Consulta Ejecutada Satisfactoriamente',
       data:    url,
     });
   }
}

module.exports = GoogleRedirectController;
