const BaseController = require('../_base/BaseController');

class ConsultarColoresIdController extends BaseController {
  constructor(consultarColoresIdUseCase) {
    super();
    this.consultarColoresIdUseCase = consultarColoresIdUseCase;
  }
  
  consultarColoresId=  this.handle(async (req, res) => {
    const output = await this.consultarColoresIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarColoresIdController;