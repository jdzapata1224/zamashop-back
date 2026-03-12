const BaseController = require('../_base/BaseController');

class CrearOpcionesController extends BaseController {
  constructor(crearOpcionesUseCase) {
    super();
    this.crearOpcionesUseCase = crearOpcionesUseCase;
  }
  crearOpciones = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearOpcionesUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearOpcionesController;