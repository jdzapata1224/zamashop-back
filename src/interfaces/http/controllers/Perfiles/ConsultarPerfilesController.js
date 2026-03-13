const BaseController = require('../_base/BaseController');
class ConsultarPerfilesController extends BaseController {
  constructor(consultarPerfilesUseCase) {
    super();
    this.consultarPerfilesUseCase = consultarPerfilesUseCase;
  }

  consultarPerfiles=  this.handle(async (req, res) => {
    const output = await this.consultarPerfilesUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarPerfilesController;