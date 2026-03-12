const BaseController = require('../_base/BaseController');

class EliminarUsuarioController extends BaseController {
  constructor(eliminarUsuarioUseCase) {
    super();
    this.eliminarUsuarioUseCase = eliminarUsuarioUseCase;
  }

  eliminarUsuario = this.handle(async (req, res) => {
    await this.eliminarUsuarioUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });
}

module.exports = EliminarUsuarioController;
