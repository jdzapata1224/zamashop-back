class ActualizarUsuarioController {
  constructor(actualizarUsuarioUseCase) {

    this.actualizarUsuarioUseCase = actualizarUsuarioUseCase;
  }

  

  actualizarUsuario  = async (req, res) => {
    try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(200).json({ codigo: 400, message: 'No Se Ha Recibido Ningun Parametro' });
    }
      const output = await this.actualizarUsuarioUseCase.execute({
        ...req.body, 
        token: req.headers.authorization ?? null 
      });  

      return res.status(200).json({
        codigo: 200,
        mensaje:"Registro Actualizado Satisfactoriamente",
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = ActualizarUsuarioController;