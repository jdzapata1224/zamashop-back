const BaseController = require('../_base/BaseController');

class CrearUsuarioController extends BaseController {
  constructor(crearUsuarioUseCase) {
    super();
    this.crearUsuarioUseCase = crearUsuarioUseCase;
  }
  
crearUsuario = this.handle(async (req, res) => {
    this.requireBody(req);
    await this.crearUsuarioUseCase.execute({ ...req.body, infoLogin: req.infoLogin });
    res.status(200).json({ codigo: 200, mensaje: 'Registro Creado Satisfactoriamente' });
  });
}

module.exports = CrearUsuarioController;