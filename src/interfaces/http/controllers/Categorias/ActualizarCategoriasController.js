class ActualizarCategoriasController {
  constructor(actualizarCategoriasUseCase) {

    this.actualizarCategoriasUseCase = actualizarCategoriasUseCase;
  }

  actualizarCategorias  = async (req, res) => {
    try {

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(200).json({ codigo: 400, message: 'No Se Ha Recibido Ningun Parametro' });
    }
      await this.actualizarCategoriasUseCase.execute({
        ...req.body,
        id:    req.params.id,           // id viene de la URL
        UsuarioToken: req.usuario,
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

module.exports = ActualizarCategoriasController;