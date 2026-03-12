const BaseController = require('../_base/BaseController');

class ConsultarOpcionesIdController extends BaseController{
  constructor(consultarOpcionesIdUseCase) {
    super();
    this.consultarOpcionesIdUseCase = consultarOpcionesIdUseCase;
  }

  consultarOpcionesId = this.handle(async (req, res) => {
    const output = await this.consultarOpcionesIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
}

module.exports = ConsultarOpcionesIdController;