class EliminarCategoriasController {
  constructor(eliminarCategoriasUseCase) {
    this.eliminarCategoriasUseCase = eliminarCategoriasUseCase;
  }

  eliminarCategorias = async (req, res) => {
    try {
      await this.eliminarCategoriasUseCase.execute({
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

module.exports = EliminarCategoriasController;
