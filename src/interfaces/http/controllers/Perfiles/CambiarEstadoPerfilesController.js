const BaseController = require('../_base/BaseController');

class CambiarEstadoPerfilesController extends BaseController {
  constructor(cambiarEstadoPerfilesUseCase) {
    super();
    this.cambiarEstadoPerfilesUseCase = cambiarEstadoPerfilesUseCase;
  }

  cambiarEstadoPerfiles= this.handle(async (req, res) => {
    await this.cambiarEstadoPerfilesUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoPerfilesController;
