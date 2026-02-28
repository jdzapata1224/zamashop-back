class ConsultarUsuariosIdController {
  constructor(consultarUsuariosIdUseCase) {

    this.consultarUsuariosIdUseCase = consultarUsuariosIdUseCase;
  }

  

  consultarUsuarios = async (req, res) => {
    try {
      const input  = new ConsultarUsuariosIdInDto(req.params.id); // DTO IN
      const output = await this.consultarUsuariosIdUseCase.execute(input);  

      return res.status(200).json({
        success: true,
        data: output.toJSON(),
      });
    } catch (err) {
      res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
  };
}

module.exports = ConsultarUsuariosIdController;