const BaseController = require('../_base/BaseController');

class EliminarCategoriasController extends BaseController {
  constructor(eliminarCategoriasUseCase) {
    super();
    this.eliminarCategoriasUseCase = eliminarCategoriasUseCase;
  }

  eliminarCategorias  = this.handle(async (req, res) => {
    
    await this.eliminarCategoriasUseCase.execute({ id:    req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarCategoriasController;
