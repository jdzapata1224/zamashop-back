const BaseController = require('../_base/BaseController');

class CrearPerfilesController extends BaseController {
  constructor(crearPerfilesUseCase) {
    super();
    this.crearPerfilesUseCase = crearPerfilesUseCase;
  }
  
  crearPerfiles  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearPerfilesUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearPerfilesController;