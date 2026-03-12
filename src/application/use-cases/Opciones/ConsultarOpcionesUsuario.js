const ConsultarOpcionesUsuarioIn  = require('../../dtos/OpcionesUsuarios/in/ConsultarOpcionesUsuarioIn.dto');
const ConsultarOpcionesUsuarioOut   = require('../../dtos/OpcionesUsuarios/out/ConsultarOpcionesUsuarioOut.dto');

class ConsultarOpcionesUsuario {
  constructor(opcionesUsuariosRepository) {
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarOpcionesUsuarioIn({ ...rawInput, usuarioConssulta: tokenId });
    const opciones = await this.opcionesUsuariosRepository.findByUsuarioId(inputDto.id);
    return ConsultarOpcionesUsuarioOut.fromEntities(opciones);
  }
}

module.exports = ConsultarOpcionesUsuario;