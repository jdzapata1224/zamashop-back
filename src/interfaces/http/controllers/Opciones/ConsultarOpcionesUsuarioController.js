const BaseController = require('../_base/BaseController');

class ConsultarOpcionesUsuarioController extends BaseController{
  constructor(consultarOpcionesUsuarioUseCase) {
    super();
    this.consultarOpcionesUsuarioUseCase = consultarOpcionesUsuarioUseCase;
  }

  consultarOpcionesUsuario = this.handle(async (req, res) => {
    const output = await this.consultarOpcionesUsuarioUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });  

}

module.exports = ConsultarOpcionesUsuarioController;