const BaseController = require('../_base/BaseController');

class ConsultarProductoVariacionIdController extends BaseController {
  constructor(consultarProductoVariacionIdUseCase) {
    super();
    this.consultarProductoVariacionIdUseCase = consultarProductoVariacionIdUseCase;
  }
  
  consultarProductoVariacionId=  this.handle(async (req, res) => {
    const output = await this.consultarProductoVariacionIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarProductoVariacionIdController;