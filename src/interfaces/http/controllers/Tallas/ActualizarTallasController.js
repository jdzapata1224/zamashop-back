const BaseController = require('../_base/BaseController');

class ActualizarTallasController extends BaseController {
  constructor(actualizarTallasUseCase) {
    super();
    this.actualizarTallasUseCase = actualizarTallasUseCase;
  }

  actualizarTallas  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarTallasUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarTallasController;