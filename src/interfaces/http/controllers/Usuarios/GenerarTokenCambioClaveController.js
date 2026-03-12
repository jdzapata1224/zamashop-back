class GenerarTokenCambioClaveController {
  constructor(generarTokenCambioClaveUseCase) {
    this.generarTokenCambioClaveUseCase = generarTokenCambioClaveUseCase;
  }

  generarToken = async (req, res) => {
    try {

      const result = await this.generarTokenCambioClaveUseCase.execute({
        id:    req.params.id,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
        infoLogin: req.infoLogin

      });
      return res.status(200).json({ codigo: 200, mensaje: 'Token generado', data: result });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = GenerarTokenCambioClaveController;
