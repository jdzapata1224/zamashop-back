class EliminarUsuarioController {
  constructor(eliminarUsuarioUseCase) {
    this.eliminarUsuarioUseCase = eliminarUsuarioUseCase;
  }

  eliminarUsuario = async (req, res) => {
    try {
      await this.eliminarUsuarioUseCase.execute({
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

module.exports = EliminarUsuarioController;
