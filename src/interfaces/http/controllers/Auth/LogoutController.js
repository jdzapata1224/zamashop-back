class LogoutController {
  constructor(logoutUseCase) {
    this.logoutUseCase = logoutUseCase;
  }

  logout = async (req, res) => {
    try {
      const token = req.headers['authorization'].slice(7).trim();
      await this.logoutUseCase.execute(token);
      return res.status(200).json({ codigo: 200, mensaje: 'Sesión cerrada correctamente' });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = LogoutController;
