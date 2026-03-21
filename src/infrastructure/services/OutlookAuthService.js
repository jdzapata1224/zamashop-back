const { ConfidentialClientApplication } = require('@azure/msal-node');

/**
 * Crea el cliente MSAL en el momento de uso,
 * garantizando que las variables de entorno ya están cargadas.
 */
function createClient() {
  return new ConfidentialClientApplication({
    auth: {
      clientId:     process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      authority:    `https://login.microsoftonline.com/common`,
    },
  });
}

/**
 * Devuelve la URL de Microsoft para que el frontend redirija al usuario.
 */
async function getOutlookAuthUrl() {
  const client = createClient();
  return client.getAuthCodeUrl({
    scopes:      ['openid', 'email', 'profile', 'User.Read'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI, // apunta al FRONTEND
  });
}

/**
 * Intercambia el `code` que llega del frontend por la identidad del usuario.
 * Retorna: { email, nombre, verified }
 */
async function exchangeCodeForUser(code) {
  const client = createClient();

  const response = await client.acquireTokenByCode({
    code,
    scopes:      ['openid', 'email', 'profile', 'User.Read'],
    redirectUri: process.env.OUTLOOK_REDIRECT_URI,
  });

  const claims = response.idTokenClaims;

  return {
    email:    claims.email || claims.preferred_username,
    nombre:   claims.name,
    verified: true, // Microsoft siempre devuelve cuentas verificadas
  };
}

module.exports = { getOutlookAuthUrl, exchangeCodeForUser };
