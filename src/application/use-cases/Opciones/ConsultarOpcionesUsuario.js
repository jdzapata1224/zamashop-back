const ConsultarOpcionesUsuarioIn  = require('../../dtos/OpcionesUsuarios/in/ConsultarOpcionesUsuarioIn.dto');
const ConsultarOpcionesUsuarioOut   = require('../../dtos/OpcionesUsuarios/out/ConsultarOpcionesUsuarioOut.dto');

class ConsultarOpcionesUsuario {
  constructor(opcionesUsuariosRepository) {
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute({ id, usuarioToken }) {
    const { id: tokenId } = usuarioToken;
    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new ConsultarOpcionesUsuarioIn(id);

    const opciones = await this.opcionesUsuariosRepository.findByUsuarioId(inputDto.id);

    return ConsultarOpcionesUsuarioOut.fromEntities(opciones);
  }
}

module.exports = ConsultarOpcionesUsuario;