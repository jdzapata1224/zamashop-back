const BaseController = require('../_base/BaseController');

class CambiarEstadoUsuarioController extends BaseController {
  constructor(cambiarEstadoUsuarioUseCase) {
    super();
    this.cambiarEstadoUsuarioUseCase = cambiarEstadoUsuarioUseCase;
  }

  cambiarEstadoUsuario = this.handle(async (req, res) => {
    await this.cambiarEstadoUsuarioUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Estado Actualizado Satisfactoriamente' });
  });
}

module.exports = CambiarEstadoUsuarioController;
