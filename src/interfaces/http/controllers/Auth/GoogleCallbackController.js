const { exchangeCodeForUser } = require('../../../../infrastructure/services/GoogleAuthService');

class GoogleCallbackController {
  constructor(loginGoogleUseCase) {
    this.loginGoogleUseCase = loginGoogleUseCase;
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

      const googleUser = await exchangeCodeForUser(code);
      
      const { token } = await this.loginGoogleUseCase.execute({
        email:     googleUser.email,
        verified:  googleUser.verified,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Login exitoso',
        data2:token,
        data:    googleUser,
      });

    } catch (err) {
      return res.status(err.statusCode || 500).json({
        codigo:  err.statusCode || 500,
        mensaje: err.message || 'Error interno del servidor',
        data:err
      });
    }
  };
}

module.exports = GoogleCallbackController;