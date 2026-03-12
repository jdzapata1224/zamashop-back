class ConsultarUsuariosIdController {
  constructor(consultarUsuariosIdUseCase) {

    this.consultarUsuariosIdUseCase = consultarUsuariosIdUseCase;
  }

  

  consultarUsuariosId = async (req, res) => {
    try {
      const output = await this.consultarUsuariosIdUseCase.execute({
        id:    req.params.id,
        infoLogin: req.infoLogin
      });

      return res.status(200).json({
        codigo: 200,
        mensaje:"Consulta Ejecutada Satisfactoriamente",
        data: output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = ConsultarUsuariosIdController;