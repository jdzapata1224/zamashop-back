const ConsultarOpcionesPerfilIn  = require('../../dtos/OpcionesPerfiles/in/ConsultarOpcionesPerfilIn.dto');
const ConsultarOpcionesPerfilOut   = require('../../dtos/OpcionesPerfiles/out/ConsultarOpcionesPerfilOut.dto');

class ConsultarOpcionesPerfil {
  constructor(opcionesPerfilesRepository) {
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
  }

  async execute({ id, usuarioToken }) {
    const { id: tokenId } = usuarioToken;
    if (!tokenId) throw new Error('Token inválido: id de perfil no encontrado');

    const inputDto = new ConsultarOpcionesPerfilIn(id);

    const opciones = await this.opcionesPerfilesRepository.findByPerfilId(inputDto.id);

    return ConsultarOpcionesPerfilOut.fromEntities(opciones);
  }
}

module.exports = ConsultarOpcionesPerfil;