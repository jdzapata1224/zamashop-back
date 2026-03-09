class LoginController {
  constructor(loginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  login = async (req, res) => {
    try {
      const output = await this.loginUseCase.execute(req.body);
      return res.status(200).json({
        codigo:  200,
        mensaje: 'Login exitoso',
        data:    output,
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ codigo: err.statusCode || 400, mensaje: err.message });
    }
  };
}

module.exports = LoginController;
