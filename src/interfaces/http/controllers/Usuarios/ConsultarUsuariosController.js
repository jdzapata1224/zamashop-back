const BaseController = require('../_base/BaseController');

class ConsultarUsuariosController extends BaseController {
  constructor(consultarUsuariosUseCase) {
    super();
    this.consultarUsuariosUseCase = consultarUsuariosUseCase;
  }

  consultarUsuarios = this.handle(async (req, res) => {
    const output = await this.consultarUsuariosUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarUsuariosController;