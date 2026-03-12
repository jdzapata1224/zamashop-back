const BaseController = require('../_base/BaseController');

class AsignarOpcionPerfilController extends BaseController {
  constructor(asignarOpcionPerfilUseCase) {
    super();
    this.asignarOpcionPerfilUseCase = asignarOpcionPerfilUseCase;
  }

  asignarOpcion = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.asignarOpcionPerfilUseCase.execute({ ...req.body, id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });
}

module.exports = AsignarOpcionPerfilController;