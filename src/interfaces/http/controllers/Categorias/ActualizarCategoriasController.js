const BaseController = require('../_base/BaseController');

class ActualizarCategoriasController extends BaseController {
  constructor(actualizarCategoriasUseCase) {
    super();
    this.actualizarCategoriasUseCase = actualizarCategoriasUseCase;
  }

  actualizarCategorias  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearUsuarioUseCase.execute({ ...req.body, id:    req.params.id,infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = ActualizarCategoriasController;