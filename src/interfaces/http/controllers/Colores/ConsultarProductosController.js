const BaseController = require('../_base/BaseController');
class ConsultarProductosController extends BaseController {
  constructor(consultarProductosUseCase) {
    super();
    this.consultarProductosUseCase = consultarProductosUseCase;
  }

  consultarProductos=  this.handle(async (req, res) => {
    const output = await this.consultarProductosUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarProductosController;