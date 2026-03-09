class CrearOpcionesController {
  constructor(crearOpcionesUseCase) {

    this.crearOpcionesUseCase = crearOpcionesUseCase;
  }
  
  crearOpciones  = async (req, res) => {
    try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(200).json({ codigo: 400, message: 'No Se Ha Recibido Ningun Parametro' });
    }
      await this.crearOpcionesUseCase.execute({
        ...req.body, 
        usuarioToken: req.usuario,
      });  

      return res.status(200).json({
        codigo: 200,
        mensaje:"Registro Creado Satisfactoriamente",
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = CrearOpcionesController;