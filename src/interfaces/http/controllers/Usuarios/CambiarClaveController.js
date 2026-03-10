class CambiarClaveController {
  constructor(cambiarClaveUseCase) {
    this.cambiarClaveUseCase = cambiarClaveUseCase;
  }

  cambiarClave = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(200).json({ codigo: 400, mensaje: 'Token requerido en header Authorization' });
      }
      const token = authHeader.slice(7).trim();
      if (!req.body?.nuevaClave) {
        return res.status(200).json({ codigo: 400, mensaje: 'nuevaClave es requerida' });
      }
      await this.cambiarClaveUseCase.execute({ token, nuevaClave: req.body.nuevaClave });
      return res.status(200).json({ codigo: 200, mensaje: 'Clave actualizada correctamente' });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = CambiarClaveController;
