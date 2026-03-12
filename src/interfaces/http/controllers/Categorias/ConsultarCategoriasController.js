const BaseController = require('../_base/BaseController');
class ConsultarCategoriasController extends BaseController {
  constructor(consultarCategoriasUseCase) {
    super();
    this.consultarCategoriasUseCase = consultarCategoriasUseCase;
  }

  consultarCategorias=  this.handle(async (req, res) => {
    const output = await this.consultarCategoriasUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarCategoriasController;