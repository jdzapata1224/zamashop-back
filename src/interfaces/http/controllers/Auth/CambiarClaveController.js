class CambiarClaveController {
  constructor(cambiarClaveUseCase) {
    this.cambiarClaveUseCase = cambiarClaveUseCase;
  }

  cambiarClave = async (req, res) => {
    try {
      if (!req.body?.token || !req.body?.nuevaClave) {
        return res.status(200).json({ codigo: 400, mensaje: 'token y nuevaClave son requeridos' });
      }
      await this.cambiarClaveUseCase.execute(req.body);
      return res.status(200).json({ codigo: 200, mensaje: 'Clave actualizada correctamente' });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = CambiarClaveController;
