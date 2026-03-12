class ConsultarOpcionesController {
  constructor(consultarOpcionesUseCase) {

    this.consultarOpcionesUseCase = consultarOpcionesUseCase;
  }

  

  consultarOpciones = async (req, res) => {
    try {
      const output = await this.consultarOpcionesUseCase.execute();  

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

module.exports = ConsultarOpcionesController;