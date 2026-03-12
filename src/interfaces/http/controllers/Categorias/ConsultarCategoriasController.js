class ConsultarCategoriasController {
  constructor(consultarCategoriasUseCase) {

    this.consultarCategoriasUseCase = consultarCategoriasUseCase;
  }

  

  consultarCategorias = async (req, res) => {
    try {
      const output = await this.consultarCategoriasUseCase.execute();  

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

module.exports = ConsultarCategoriasController;