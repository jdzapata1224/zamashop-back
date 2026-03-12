const BaseController = require('../_base/BaseController');

class ConsultarUsuariosIdController extends BaseController{
  constructor(consultarUsuariosIdUseCase) {
    super();
    this.consultarUsuariosIdUseCase = consultarUsuariosIdUseCase;
  }

  consultarUsuariosId = this.handle(async (req, res) => {
    const output = await this.consultarUsuariosIdUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });
  

}

module.exports = ConsultarUsuariosIdController;