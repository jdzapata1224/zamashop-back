class ConsultarOpcionesUsuarioController {
  constructor(consultarOpcionesUsuarioUseCase) {
    this.consultarOpcionesUsuarioUseCase = consultarOpcionesUsuarioUseCase;
  }

  consultarOpcionesUsuario = async (req, res) => {
    try {
      const output = await this.consultarOpcionesUsuarioUseCase.execute({
        id:           req.params.id,
        usuarioToken: req.usuario,
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Consulta Ejecutada Satisfactoriamente',
        data:    output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
  };
}

module.exports = ConsultarOpcionesUsuarioController;