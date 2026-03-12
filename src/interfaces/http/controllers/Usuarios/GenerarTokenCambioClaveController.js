const BaseController = require('../_base/BaseController');

class GenerarTokenCambioClaveController extends BaseController {
  constructor(generarTokenCambioClaveUseCase) {
    super();
    this.generarTokenCambioClaveUseCase = generarTokenCambioClaveUseCase;
  }

  generarToken = this.handle(async (req, res) => {
    const result = await this.generarTokenCambioClaveUseCase.execute({
      usuarioId: req.params.id,
      ip:        req.ip || req.headers['x-forwarded-for'] || null,
      userAgent: req.headers['user-agent'] || null,
      infoLogin: req.infoLogin
    });
    res.status(200).json({ codigo: 200, mensaje: 'Token generado', data: result });
  });
}

module.exports = GenerarTokenCambioClaveController;
