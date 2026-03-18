const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

/**
 * Genera la URL de autorización de Google para iniciar el flujo OAuth.
 * El parámetro `state` se usa para prevenir CSRF.
 */
function getGoogleAuthUrl(state) {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account',
    state,
  });
}

/**
 * Intercambia el `code` de Google por la identidad del usuario.
 * Retorna: { email, nombre, googleId, verified }
 */
async function exchangeCodeForUser(code) {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken:  tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  return {
    googleId: payload.sub,
    email:    payload.email,
    nombre:   payload.name,
    verified: payload.email_verified,
  };
}

module.exports = { getGoogleAuthUrl, exchangeCodeForUser };
