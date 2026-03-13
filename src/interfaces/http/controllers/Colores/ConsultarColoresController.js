const BaseController = require('../_base/BaseController');
class ConsultarColoresController extends BaseController {
  constructor(consultarColoresUseCase) {
    super();
    this.consultarColoresUseCase = consultarColoresUseCase;
  }

  consultarColores=  this.handle(async (req, res) => {
    const output = await this.consultarColoresUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarColoresController;