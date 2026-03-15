class BaseController {
  requireBody(req) {
    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error('No se ha recibido ningún parámetro');
      err.statusCode = 400;
      throw err;
    }
  }

  handle(fn) {
    return async (req, res) => {
      try {
        await fn(req, res);
      } catch (err) {
        // Error controlado: tiene statusCode definido (negocio/validación)
        if (err.statusCode) {
          return res.status(err.statusCode).json({
            codigo: err.statusCode,
            mensaje: err.message,
          });
        }

        // Error inesperado: Mongoose, red, null reference, etc.
        console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);
        return res.status(500).json({
          codigo: 500,
          mensaje: 'Error interno del servidor',
        });
      }
    };
  }
}

module.exports = BaseController;