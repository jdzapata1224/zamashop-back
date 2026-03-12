const BaseController = require('../_base/BaseController');

class EliminarOpcionesController extends BaseController{
  constructor(eliminarOpcionesUseCase) {
    super();
    this.eliminarOpcionesUseCase = eliminarOpcionesUseCase;
  }


  eliminarOpciones = this.handle(async (req, res) => {
    await this.eliminarOpcionesUseCase.execute({ id: req.params.id, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Eliminado Satisfactoriamente' });
  });

  
}

module.exports = EliminarOpcionesController;
