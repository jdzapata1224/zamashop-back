const { exchangeCodeForUser } = require('../../../../infrastructure/services/OutlookAuthService');

class OutlookCallbackController {
  constructor(loginOutlookUseCase) {
    this.loginOutlookUseCase = loginOutlookUseCase;
  }

  callback = async (req, res) => {
    try {
      const { code } = req.body;

      if (!code) {
        return res.status(400).json({
          codigo:  400,
          mensaje: 'El parámetro code es requerido',
        });
      }

      const outlookUser = await exchangeCodeForUser(code);

      const { token } = await this.loginOutlookUseCase.execute({
        email:     outlookUser.email,
        verified:  outlookUser.verified,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Login exitoso',
        data:    token,
      });

    } catch (err) {
      return res.status(err.statusCode || 500).json({
        codigo:  err.statusCode || 500,
        mensaje: err.message || 'Error interno del servidor',
      });
    }
  };
}

module.exports = OutlookCallbackController;
