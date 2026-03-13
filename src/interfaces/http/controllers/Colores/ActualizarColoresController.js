const BaseController = require('../_base/BaseController');

class ActualizarColoresController extends BaseController {
  constructor(actualizarColoresUseCase) {
    super();
    this.actualizarColoresUseCase = actualizarColoresUseCase;
  }

  actualizarColores  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarColoresUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarColoresController;