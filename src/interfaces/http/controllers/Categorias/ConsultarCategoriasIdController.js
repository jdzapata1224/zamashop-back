const BaseController = require('../_base/BaseController');

class ConsultarCategoriasIdController extends BaseController {
  constructor(consultarCategoriasIdUseCase) {
    super();
    this.consultarCategoriasIdUseCase = consultarCategoriasIdUseCase;
  }
  
  consultarCategoriasId=  this.handle(async (req, res) => {
    const output = await this.consultarCategoriasIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
   
  });
}

module.exports = ConsultarCategoriasIdController;