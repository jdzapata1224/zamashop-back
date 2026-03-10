class GenerarTokenCambioClaveController {
  constructor(generarTokenCambioClaveUseCase) {
    this.generarTokenCambioClaveUseCase = generarTokenCambioClaveUseCase;
  }

  generarToken = async (req, res) => {
    try {
      if (!req.body?.usuarioId) {
        return res.status(200).json({ codigo: 400, mensaje: 'usuarioId es requerido' });
      }
      const result = await this.generarTokenCambioClaveUseCase.execute({
        usuarioId: req.body.usuarioId,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
      });
      return res.status(200).json({ codigo: 200, mensaje: 'Token generado', data: result });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = GenerarTokenCambioClaveController;
