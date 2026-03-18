const helmet          = require('helmet');
const rateLimit       = require('express-rate-limit');
const mongoSanitize   = require('express-mongo-sanitize');

// ─── 1. HELMET — Headers de seguridad HTTP ────────────────────────────────────
const helmetMiddleware = helmet({
  // Previene que el navegador adivine el Content-Type (MIME sniffing)
  noSniff: true,

  // Protección básica contra XSS en navegadores antiguos
  xssFilter: true,

  // Evita que tu app sea embebida en iframes (clickjacking)
  frameguard: { action: 'deny' },

  // Fuerza HTTPS en producción (desactívalo en desarrollo si usas HTTP)
  hsts: process.env.NODE_ENV === 'production'
    ? { maxAge: 31536000, includeSubDomains: true }
    : false,

  // Oculta que el servidor es Express
  hidePoweredBy: true,

  // Política de referrer
  referrerPolicy: { policy: 'no-referrer' },
});

// ─── 2. RATE LIMITING — Límite general para toda la API ──────────────────────
const globalLimiter = rateLimit({
  windowMs:         15 * 60 * 1000, // ventana de 15 minutos
  max:              100,             // máximo 100 peticiones por IP por ventana
  standardHeaders:  true,            // incluye RateLimit-* headers en la respuesta
  legacyHeaders:    false,
  message: {
    codigo:  429,
    mensaje: 'Demasiadas peticiones, intente de nuevo más tarde',
  },
});

// ─── 3. RATE LIMITING — Límite estricto para endpoints de autenticación ───────
// Login, Google, Outlook — los más sensibles a fuerza bruta
const authLimiter = rateLimit({
  windowMs:        15 * 60 * 1000, // ventana de 15 minutos
  max:             10,              // máximo 10 intentos por IP
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    codigo:  429,
    mensaje: 'Demasiados intentos de inicio de sesión, intente de nuevo en 15 minutos',
  },
  // Cuenta solo respuestas exitosas y fallidas de auth (no 500)
  skipSuccessfulRequests: false,
});

// ─── 4. MONGO SANITIZE — Previene inyección NoSQL ────────────────────────────
// Elimina caracteres como $ y . de req.body, req.query y req.params
// que podrían manipular queries de MongoDB
const mongoSanitizeMiddleware = mongoSanitize({
  replaceWith:     '_',   // reemplaza $ y . con _ en lugar de eliminarlos
  allowDots:       false,
  onSanitize: ({ req, key }) => {
    console.warn(`[WAF] Intento de inyección NoSQL bloqueado - IP: ${req.ip} - Campo: ${key}`);
  },
});

module.exports = {
  helmetMiddleware,
  globalLimiter,
  authLimiter,
  mongoSanitizeMiddleware,
};
