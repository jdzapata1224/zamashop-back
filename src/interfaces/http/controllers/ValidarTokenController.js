class ValidarTokenController {
  constructor(validarTokenUseCase) {
    this.validarTokenUseCase = validarTokenUseCase;
  }

  validarToken = async (req, res) => {
    try {
      const output = this.validarTokenUseCase.execute({
        authorization: req.headers['authorization'] ?? null,
      });

      return res.status(200).json({
        codigo:  200,
        mensaje: 'Token válido',
        data:    output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({
        codigo:  err.statusCode || 400,
        mensaje: err.message,
      });
    }
  };
}

module.exports = ValidarTokenController;