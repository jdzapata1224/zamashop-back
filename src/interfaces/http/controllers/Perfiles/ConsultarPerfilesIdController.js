const BaseController = require('../_base/BaseController');

class ConsultarPerfilesIdController extends BaseController {
  constructor(consultarPerfilesIdUseCase) {
    super();
    this.consultarPerfilesIdUseCase = consultarPerfilesIdUseCase;
  }
  
  consultarPerfilesId=  this.handle(async (req, res) => {
    const output = await this.consultarPerfilesIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarPerfilesIdController;