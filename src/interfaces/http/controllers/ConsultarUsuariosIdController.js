const ConsultarUsuariosIn = require('../../../application/dtos/Usuarios/in/ConsultarUsuariosIdIn.dto');

class ConsultarUsuariosIdController {
  constructor(consultarUsuariosIdUseCase) {

    this.consultarUsuariosIdUseCase = consultarUsuariosIdUseCase;
  }

  

  consultarUsuarios = async (req, res) => {
    try {
      console.log(req.params.id);
      const output = await this.consultarUsuariosIdUseCase.execute(req.params.id);  

      return res.status(200).json({
        codigo: 200,
        data: output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
  };
}

module.exports = ConsultarUsuariosIdController;