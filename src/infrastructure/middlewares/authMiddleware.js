const jwt = require('jsonwebtoken');

const authMiddleware = (tokensRepository) => async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ codigo: 401, mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.slice(7).trim();

  try {
    const decoded  = jwt.verify(token, process.env.JWT_SECRET);
    const tokenDoc = await tokensRepository.findByJtiYAction(decoded.jti, 'LOGIN');
    if (!tokenDoc) {
      return res.status(401).json({ codigo: 401, mensaje: 'Token inválido o sesión cerrada' });
    }
    req.infoLogin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      try {
        const decoded = jwt.decode(token);
        if (decoded?.jti) await tokensRepository.invalidateByJti(decoded.jti).catch(() => {});
      } catch (_) {}
      return res.status(401).json({ codigo: 401, mensaje: 'Token expirado' });
    }
    return res.status(401).json({ codigo: 401, mensaje: 'Token inválido' });
  }
};

module.exports = authMiddleware;