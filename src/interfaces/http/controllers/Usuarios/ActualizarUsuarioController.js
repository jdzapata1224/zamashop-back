const BaseController = require('../_base/BaseController');

class ActualizarUsuarioController extends BaseController {
  constructor(actualizarUsuarioUseCase) {
    super();
    this.actualizarUsuarioUseCase = actualizarUsuarioUseCase;
  }

  actualizarUsuario = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.actualizarUsuarioUseCase.execute({ ...req.body, id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });

  
}

module.exports = ActualizarUsuarioController;