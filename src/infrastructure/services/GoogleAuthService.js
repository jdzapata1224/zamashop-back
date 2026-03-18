const { OAuth2Client } = require('google-auth-library');

/**
 * Crea el cliente OAuth2 en el momento de uso,
 * garantizando que las variables de entorno ya están cargadas.
 */
function createClient() {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );
}

/**
 * Genera la URL de autorización de Google para iniciar el flujo OAuth.
 */
function getGoogleAuthUrl(state) {
  const client = createClient();
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    prompt: 'select_account',
    state,
  });
}

/**
 * Intercambia el `code` de Google por la identidad del usuario.
 * Retorna: { googleId, email, nombre, verified }
 */
async function exchangeCodeForUser(code) {
  const client = createClient();
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