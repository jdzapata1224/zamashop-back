class LoginController {
  constructor(loginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  login = async (req, res) => {
    try {
      const output = await this.loginUseCase.execute({
        ...req.body,
        ip:        req.ip || req.headers['x-forwarded-for'] || null,
        userAgent: req.headers['user-agent'] || null,
      });


      return res.status(200).json({
        codigo:  200,
        mensaje: 'Login exitoso',
        data:    output.token,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: err.statusCode || 400, mensaje: err.message });
    }
  };
}

module.exports = LoginController;
