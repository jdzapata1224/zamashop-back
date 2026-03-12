const BaseController = require('../_base/BaseController');

class CambiarClaveController extends BaseController {
  constructor(cambiarClaveUseCase) {
    super();
    this.cambiarClaveUseCase = cambiarClaveUseCase;
  }

  cambiarClave = this.handle(async (req, res) => {

      const authHeader = req.headers['authorization'];
      if (!authHeader?.startsWith('Bearer ')) {
        const err = new Error('Token requerido en header Authorization');
        err.statusCode = 400;
        throw err;
      }
      const token = authHeader.slice(7).trim();
     if (!req.body?.nuevaClave) {
      const err = new Error('nuevaClave es requerida');
      err.statusCode = 400;
      throw err;
    }
      this.requireBody(req);

      await this.cambiarClaveUseCase.execute({ token, nuevaClave: req.body.nuevaClave });
      return res.status(200).json({ codigo: 200, mensaje: 'Clave actualizada correctamente' });

  });
}

module.exports = CambiarClaveController;
