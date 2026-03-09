class CambiarEstadoUsuarioController {
  constructor(cambiarEstadoUsuarioUseCase) {
    this.cambiarEstadoUsuarioUseCase = cambiarEstadoUsuarioUseCase;
  }

  cambiarEstadoUsuario = async (req, res) => {
    try {
      await this.cambiarEstadoUsuarioUseCase.execute({
        id:    req.params.id,
        usuarioToken: req.usuario, 
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Registro Actualizado Satisfactoriamente',
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = CambiarEstadoUsuarioController;
