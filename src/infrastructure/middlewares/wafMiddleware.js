const helmet        = require('helmet');
const rateLimit     = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// ─── 1. HELMET — Headers de seguridad HTTP ────────────────────────────────────
const helmetMiddleware = helmet({
  noSniff:       true,
  xssFilter:     true,
  frameguard:    { action: 'deny' },
  hidePoweredBy: true,
  referrerPolicy: { policy: 'no-referrer' },
  hsts: process.env.NODE_ENV === 'production'
    ? { maxAge: 31536000, includeSubDomains: true }
    : false,
});

// ─── 2. RATE LIMITING — Límite general para toda la API ──────────────────────
const globalLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    codigo:  429,
    mensaje: 'Demasiadas peticiones, intente de nuevo más tarde',
  },
});

// ─── 3. RATE LIMITING — Límite estricto para autenticación ───────────────────
const authLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    codigo:  429,
    mensaje: 'Demasiados intentos de inicio de sesión, intente de nuevo en 15 minutos',
  },
});

// ─── 4. MONGO SANITIZE — Previene inyección NoSQL ────────────────────────────
// Solo sanitiza req.body — evita el error de req.query siendo read-only
const mongoSanitizeMiddleware = (req, res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body, { allowDots: false });
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params, { allowDots: false });
  }
  next();
};

module.exports = {
  helmetMiddleware,
  globalLimiter,
  authLimiter,
  mongoSanitizeMiddleware,
};
