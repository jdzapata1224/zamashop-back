const BaseController = require('../_base/BaseController');

class CambiarEstadoProductoVariacionController extends BaseController {
  constructor(cambiarEstadoProductoVariacionUseCase) {
    super();
    this.cambiarEstadoProductoVariacionUseCase = cambiarEstadoProductoVariacionUseCase;
  }

  cambiarEstadoProductoVariacion= this.handle(async (req, res) => {
    await this.cambiarEstadoProductoVariacionUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoProductoVariacionController;
