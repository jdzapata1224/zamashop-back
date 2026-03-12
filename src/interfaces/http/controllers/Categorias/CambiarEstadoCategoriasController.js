const BaseController = require('../_base/BaseController');

class CambiarEstadoCategoriasController extends BaseController {
  constructor(cambiarEstadoCategoriasUseCase) {
    super();
    this.cambiarEstadoCategoriasUseCase = cambiarEstadoCategoriasUseCase;
  }

  cambiarEstadoCategorias = this.handle(async (req, res) => {
    await this.cambiarEstadoCategoriasUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
    
  });
}

module.exports = CambiarEstadoCategoriasController;
