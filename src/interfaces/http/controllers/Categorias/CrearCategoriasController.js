const BaseController = require('../_base/BaseController');

class CrearCategoriasController extends BaseController {
  constructor(crearCategoriasUseCase) {
    super();
    this.crearCategoriasUseCase = crearCategoriasUseCase;
  }
  
  crearCategorias   = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearCategoriasUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearCategoriasController;