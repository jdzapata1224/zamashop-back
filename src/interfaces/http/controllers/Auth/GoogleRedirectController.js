const { getGoogleAuthUrl } = require('../../../../infrastructure/services/GoogleAuthService');
const { randomUUID } = require('crypto');

class GoogleRedirectController {
  redirect(req, res) {
    // Generamos un state aleatorio para prevenir CSRF.
    // En producción guárdalo en sesión o en una cookie firmada
    // y valídalo en el callback.
    const state = randomUUID();
    const url   = getGoogleAuthUrl(state);
    res.redirect(url);
  }
}

module.exports = GoogleRedirectController;
