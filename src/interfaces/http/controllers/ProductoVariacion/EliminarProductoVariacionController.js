const BaseController = require('../_base/BaseController');

class EliminarProductoVariacionController extends BaseController {
  constructor(eliminarProductoVariacionUseCase) {
    super();
    this.eliminarProductoVariacionUseCase = eliminarProductoVariacionUseCase;
  }

  eliminarProductoVariacion  = this.handle(async (req, res) => {
    
    await this.eliminarProductoVariacionUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarProductoVariacionController;
