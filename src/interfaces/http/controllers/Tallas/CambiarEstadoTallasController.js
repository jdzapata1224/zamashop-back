const BaseController = require('../_base/BaseController');

class CambiarEstadoTallasController extends BaseController {
  constructor(cambiarEstadoTallasUseCase) {
    super();
    this.cambiarEstadoTallasUseCase = cambiarEstadoTallasUseCase;
  }

  cambiarEstadoTallas= this.handle(async (req, res) => {
    await this.cambiarEstadoTallasUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoTallasController;
