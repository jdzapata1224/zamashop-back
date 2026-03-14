const BaseController = require('../_base/BaseController');

class CrearCategoriasController extends BaseController {
  constructor(crearCategoriasUseCase) {
    super();
    this.crearCategoriasUseCase = crearCategoriasUseCase;
  }
  
  crearCategorias   = this.handle(async (req, res) => {
    this.requireBody(req);
    const responseCraerCategoria=await this.crearCategoriasUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente',data:responseCraerCategoria });
  });
}

module.exports = CrearCategoriasController;