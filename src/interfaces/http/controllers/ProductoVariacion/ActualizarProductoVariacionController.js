const BaseController = require('../_base/BaseController');

class ActualizarProductoVariacionController extends BaseController {
  constructor(actualizarProductoVariacionUseCase) {
    super();
    this.actualizarProductoVariacionUseCase = actualizarProductoVariacionUseCase;
  }

  actualizarProductoVariacion  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarProductoVariacionUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarProductoVariacionController;