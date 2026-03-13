const BaseController = require('../_base/BaseController');

class CrearProductosController extends BaseController {
  constructor(crearProductosUseCase) {
    super();
    this.crearProductosUseCase = crearProductosUseCase;
  }
  
  crearProductos  = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearProductosUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearProductosController;