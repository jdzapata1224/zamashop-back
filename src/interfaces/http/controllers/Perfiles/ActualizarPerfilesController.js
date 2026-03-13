const BaseController = require('../_base/BaseController');

class ActualizarPerfilesController extends BaseController {
  constructor(actualizarPerfilesUseCase) {
    super();
    this.actualizarPerfilesUseCase = actualizarPerfilesUseCase;
  }

  actualizarPerfiles  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarPerfilesUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarPerfilesController;