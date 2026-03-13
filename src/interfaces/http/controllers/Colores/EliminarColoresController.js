const BaseController = require('../_base/BaseController');

class EliminarColoresController extends BaseController {
  constructor(eliminarColoresUseCase) {
    super();
    this.eliminarColoresUseCase = eliminarColoresUseCase;
  }

  eliminarColores  = this.handle(async (req, res) => {
    
    await this.eliminarColoresUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarColoresController;
