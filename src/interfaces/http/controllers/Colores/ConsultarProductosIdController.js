const BaseController = require('../_base/BaseController');

class ConsultarProductosIdController extends BaseController {
  constructor(consultarProductosIdUseCase) {
    super();
    this.consultarProductosIdUseCase = consultarProductosIdUseCase;
  }
  
  consultarProductosId=  this.handle(async (req, res) => {
    const output = await this.consultarProductosIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarProductosIdController;