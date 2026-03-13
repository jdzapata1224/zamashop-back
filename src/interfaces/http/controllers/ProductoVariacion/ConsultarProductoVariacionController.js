const BaseController = require('../_base/BaseController');
class ConsultarProductoVariacionController extends BaseController {
  constructor(consultarProductoVariacionUseCase) {
    super();
    this.consultarProductoVariacionUseCase = consultarProductoVariacionUseCase;
  }

  consultarProductoVariacion=  this.handle(async (req, res) => {
    const output = await this.consultarProductoVariacionUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarProductoVariacionController;