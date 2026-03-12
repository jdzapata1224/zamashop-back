const BaseController = require('../_base/BaseController');

class ConsultarOpcionesController extends BaseController{
  constructor(consultarOpcionesUseCase) {
    super();
    this.consultarOpcionesUseCase = consultarOpcionesUseCase;
  }

  consultarOpciones = this.handle(async (req, res) => {
    const output = await this.consultarOpcionesUseCase.execute();
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });

}

module.exports = ConsultarOpcionesController;