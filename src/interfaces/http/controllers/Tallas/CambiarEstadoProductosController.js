const BaseController = require('../_base/BaseController');

class CambiarEstadoProductosController extends BaseController {
  constructor(cambiarEstadoProductosUseCase) {
    super();
    this.cambiarEstadoProductosUseCase = cambiarEstadoProductosUseCase;
  }

  cambiarEstadoProductos= this.handle(async (req, res) => {
    await this.cambiarEstadoProductosUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoProductosController;
