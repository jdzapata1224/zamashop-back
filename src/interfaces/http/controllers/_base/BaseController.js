class BaseController {
  /**
   * Verifica que el body no llegue vacío.
   * Lanza un error estándar que handle() capturará con 400.
   */
  requireBody(req) {
    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error('No se ha recibido ningún parámetro');
      err.statusCode = 400;
      throw err;
    }
  }

  /**
   * Envuelve la ejecución en try/catch y formatea la respuesta.
   * @param {Function} fn  - función async que recibe (req, res)
   */
  handle(fn) {
    return async (req, res) => {
      try {
        await fn(req, res);
      } catch (err) {
        res.status(err.statusCode || 400).json({ codigo: err.statusCode || 400, mensaje: err.message });
      }
    };
  }
}

module.exports = BaseController;
