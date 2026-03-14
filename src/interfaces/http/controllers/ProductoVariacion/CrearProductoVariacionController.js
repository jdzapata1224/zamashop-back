const BaseController = require('../_base/BaseController');

class CrearProductoVariacionController extends BaseController {
  constructor(crearProductoVariacionUseCase) {
    super();
    this.crearProductoVariacionUseCase = crearProductoVariacionUseCase;
  }
  
  crearProductoVariacion  = this.handle(async (req, res) => {
    this.requireBody(req);
    const responseCrearProductoVariacion=await this.crearProductoVariacionUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente',data:responseCrearProductoVariacion });
  });
}

module.exports = CrearProductoVariacionController;