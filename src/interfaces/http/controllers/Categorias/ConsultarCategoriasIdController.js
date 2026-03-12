class ConsultarCategoriasIdController {
  constructor(consultarCategoriasIdUseCase) {

    this.consultarCategoriasIdUseCase = consultarCategoriasIdUseCase;
  }

  

  consultarCategoriasId = async (req, res) => {
    try {
      const output = await this.consultarCategoriasIdUseCase.execute({
        id:           req.params.id,
        usuarioToken: req.usuario, 
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

module.exports = ConsultarCategoriasIdController;