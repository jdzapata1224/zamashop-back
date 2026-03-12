const BaseController = require('../_base/BaseController');

class AsignarOpcionUsuarioController extends BaseController{
  constructor(asignarOpcionUsuarioUseCase) {
    super();
    this.asignarOpcionUsuarioUseCase = asignarOpcionUsuarioUseCase;
  }
  asignarOpcion = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.asignarOpcionUsuarioUseCase.execute({ ...req.body, id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });

}

module.exports = AsignarOpcionUsuarioController;