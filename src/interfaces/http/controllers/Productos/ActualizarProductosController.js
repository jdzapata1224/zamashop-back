const BaseController = require('../_base/BaseController');

class ActualizarProductosController extends BaseController {
  constructor(actualizarProductosUseCase) {
    super();
    this.actualizarProductosUseCase = actualizarProductosUseCase;
  }

  actualizarProductos  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarProductosUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarProductosController;