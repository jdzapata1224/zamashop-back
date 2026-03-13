const BaseController = require('../_base/BaseController');

class ConsultarTallasIdController extends BaseController {
  constructor(consultarTallasIdUseCase) {
    super();
    this.consultarTallasIdUseCase = consultarTallasIdUseCase;
  }
  
  consultarTallasId=  this.handle(async (req, res) => {
    const output = await this.consultarTallasIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarTallasIdController;