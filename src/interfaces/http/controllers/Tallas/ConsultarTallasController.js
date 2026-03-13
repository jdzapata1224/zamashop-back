const BaseController = require('../_base/BaseController');
class ConsultarTallasController extends BaseController {
  constructor(consultarTallasUseCase) {
    super();
    this.consultarTallasUseCase = consultarTallasUseCase;
  }

  consultarTallas=  this.handle(async (req, res) => {
    const output = await this.consultarTallasUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarTallasController;