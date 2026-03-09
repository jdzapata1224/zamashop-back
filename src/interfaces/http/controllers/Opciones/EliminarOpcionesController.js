class EliminarOpcionesController {
  constructor(eliminarOpcionesUseCase) {
    this.eliminarOpcionesUseCase = eliminarOpcionesUseCase;
  }

  eliminarOpciones = async (req, res) => {
    try {
      await this.eliminarOpcionesUseCase.execute({
        id:    req.params.id,
        usuarioToken: req.usuario, 
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Registro Eliminado Satisfactoriamente',
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = EliminarOpcionesController;
