const BaseController = require('../_base/BaseController');

class ConsultarOpcionesPerfilController extends BaseController{
  constructor(consultarOpcionesPerfilUseCase) {
    super();
    this.consultarOpcionesPerfilUseCase = consultarOpcionesPerfilUseCase;
  }

  consultarOpcionesPerfil = this.handle(async (req, res) => {
    const output = await this.consultarOpcionesPerfilUseCase.execute({id:req.params.id,infoLogin: req.infoLogin});
    res.status(200).json({ codigo: 200, mensaje: 'Consulta Ejecutada Satisfactoriamente', data: output });
  });

 
}

module.exports = ConsultarOpcionesPerfilController;