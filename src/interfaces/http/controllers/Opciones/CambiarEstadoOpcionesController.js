const BaseController = require('../_base/BaseController');

class CambiarEstadoOpcionesController extends BaseController{
  constructor(cambiarEstadoOpcionesUseCase) {
    super();
    this.cambiarEstadoOpcionesUseCase = cambiarEstadoOpcionesUseCase;
  }
   cambiarEstadoOpciones = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.cambiarEstadoOpcionesUseCase.execute({id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Actualizado Satisfactoriamente' });
  });

}

module.exports = CambiarEstadoOpcionesController;
