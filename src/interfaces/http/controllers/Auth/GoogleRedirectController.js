const { getGoogleAuthUrl } = require('../../../../infrastructure/services/GoogleAuthService');
const { randomUUID } = require('crypto');

class GoogleRedirectController {
  getUrl(req, res) {
     const url = getGoogleAuthUrl();
     return res.status(200).json({
       codigo:  200,
       mensaje: 'URL generada',
       data:    url,
     });
   }
}

module.exports = GoogleRedirectController;
