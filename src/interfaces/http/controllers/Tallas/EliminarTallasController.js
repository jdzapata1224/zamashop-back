const BaseController = require('../_base/BaseController');

class EliminarTallasController extends BaseController {
  constructor(eliminarTallasUseCase) {
    super();
    this.eliminarTallasUseCase = eliminarTallasUseCase;
  }

  eliminarTallas  = this.handle(async (req, res) => {
    
    await this.eliminarTallasUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarTallasController;
