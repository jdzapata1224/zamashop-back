class ConsultarUsuariosController {
  constructor(consultarUsuariosUseCase) {

    this.consultarUsuariosUseCase = consultarUsuariosUseCase;
  }

  

  consultarUsuarios = async (req, res) => {
    try {
      const output = await this.consultarUsuariosUseCase.execute();  

      return res.status(200).json({
        codigo: 200,
        mensaje:"Consulta Ejecutada Satisfactoriamente",
        data: output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
  };
}

module.exports = ConsultarUsuariosController;