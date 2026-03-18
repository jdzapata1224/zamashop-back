const { exchangeCodeForUser } = require('../../../../infrastructure/services/GoogleAuthService');

class GoogleCallbackController {
  constructor(loginGoogleUseCase) {
    this.loginGoogleUseCase = loginGoogleUseCase;
  }

  callback = async (req, res) => {
    try {
      const { code, error } = req.query;

      // El usuario canceló o Google devolvió error
      if (error || !code) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=google_cancelado`
        );
      }

      // Intercambiar code por identidad del usuario en Google
      const googleUser = await exchangeCodeForUser(code);

      const { token } = await this.loginGoogleUseCase.execute({
        email:     googleUser.email,
        verified:  googleUser.verified,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
      });

      // Redirigir al frontend con el token en query param
      return res.redirect(
        `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
      );

    } catch (err) {
      const msg = encodeURIComponent(err.message || 'Error de autenticación con Google');
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=${msg}`
      );
    }
  };
}

module.exports = GoogleCallbackController;
