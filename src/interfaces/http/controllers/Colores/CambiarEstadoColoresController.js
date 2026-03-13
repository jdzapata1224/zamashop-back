const BaseController = require('../_base/BaseController');

class CambiarEstadoColoresController extends BaseController {
  constructor(cambiarEstadoColoresUseCase) {
    super();
    this.cambiarEstadoColoresUseCase = cambiarEstadoColoresUseCase;
  }

  cambiarEstadoColores= this.handle(async (req, res) => {
    await this.cambiarEstadoColoresUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoColoresController;
