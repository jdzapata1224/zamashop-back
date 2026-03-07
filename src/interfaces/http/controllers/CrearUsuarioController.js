class CrearUsuarioController {
  constructor(crearUsuarioUseCase) {

    this.crearUsuarioUseCase = crearUsuarioUseCase;
  }

  

  crearUsuario  = async (req, res) => {
    try {
      const output = await this.crearUsuarioUseCase.execute(req.body);  

      return res.status(200).json({
        codigo: 200,
        mensaje:"Registro Creado Satisfactoriamente",
        data: output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = CrearUsuarioController;