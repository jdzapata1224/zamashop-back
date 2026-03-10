class AsignarOpcionPerfilController {
  constructor(asignarOpcionPerfilUseCase) {
    this.asignarOpcionPerfilUseCase = asignarOpcionPerfilUseCase;
  }

  asignarOpcion = async (req, res) => {
    try {
      await this.asignarOpcionPerfilUseCase.execute({
        ...req.body,
        usuarioToken: req.usuario,
      });
      return res.status(200).json({ codigo: 200, mensaje: 'Operación realizada correctamente' });
    } catch (err) {
      return res.status(400).json({ codigo: 400, mensaje: err.message });
    }
  };
}

module.exports = AsignarOpcionPerfilController;