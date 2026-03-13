const BaseController = require('../_base/BaseController');

class EliminarProductosController extends BaseController {
  constructor(eliminarProductosUseCase) {
    super();
    this.eliminarProductosUseCase = eliminarProductosUseCase;
  }

  eliminarProductos  = this.handle(async (req, res) => {
    
    await this.eliminarProductosUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarProductosController;
