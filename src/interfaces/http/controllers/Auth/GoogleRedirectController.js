const { getGoogleAuthUrl } = require('../../../../infrastructure/services/GoogleAuthService');
const { randomUUID } = require('crypto');

class GoogleRedirectController {
  getUrl(req, res) {
     
    try {
      const url = getGoogleAuthUrl();
      return res.status(200).json({
        codigo:  200,
         mensaje: 'Consulta Ejecutada Satisfactoriamente',
        data:    url,
      });
    } catch (err) {
      return res.status(200).json({
        codigo:  500,
        mensaje: err.message || 'Error al generar URL de Outlook',
      });
    }
     
   }
}

module.exports = GoogleRedirectController;
