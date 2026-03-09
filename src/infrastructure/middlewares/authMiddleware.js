const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ codigo: 401, mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.slice(7).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id, usuario, primer_nombre, primer_apellido, correo, iat, exp }
    next();
  } catch (err) {
    const mensaje = err.name === 'TokenExpiredError'
      ? 'Token expirado'
      : 'Token inválido';
    return res.status(401).json({ codigo: 401, mensaje });
  }
};

module.exports = authMiddleware;
