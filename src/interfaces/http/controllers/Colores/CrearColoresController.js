const BaseController = require('../_base/BaseController');

class CrearColoresController extends BaseController {
  constructor(crearColoresUseCase) {
    super();
    this.crearColoresUseCase = crearColoresUseCase;
  }
  
  crearColores  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearColoresUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearColoresController;