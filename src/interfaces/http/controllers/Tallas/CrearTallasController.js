const BaseController = require('../_base/BaseController');

class CrearTallasController extends BaseController {
  constructor(crearTallasUseCase) {
    super();
    this.crearTallasUseCase = crearTallasUseCase;
  }
  
  crearTallas  = this.handle(async (req, res) => {
    this.requireBody(req);
    const responseCrearTalla=await this.crearTallasUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente',data:responseCrearTalla });
  });
}

module.exports = CrearTallasController;