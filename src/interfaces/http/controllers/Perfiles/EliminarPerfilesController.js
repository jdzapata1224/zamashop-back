const BaseController = require('../_base/BaseController');

class EliminarPerfilesController extends BaseController {
  constructor(eliminarPerfilesUseCase) {
    super();
    this.eliminarPerfilesUseCase = eliminarPerfilesUseCase;
  }

  eliminarPerfiles  = this.handle(async (req, res) => {
    
    await this.eliminarPerfilesUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarPerfilesController;
