const { getOutlookAuthUrl } = require('../../../../infrastructure/services/OutlookAuthService');

class OutlookRedirectController {
  getUrl = async (req, res) => {
    try {
      const url = await getOutlookAuthUrl(); // async a diferencia de Google
      return res.status(200).json({
        codigo:  200,
         mensaje: 'Consulta Ejecutada Satisfactoriamente',
        data:    url,
      });
    } catch (err) {
      return res.status(500).json({
        codigo:  500,
        mensaje: err.message || 'Error al generar URL de Outlook',
      });
    }
  };
}

module.exports = OutlookRedirectController;
