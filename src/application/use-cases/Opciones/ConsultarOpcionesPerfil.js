const ConsultarOpcionesPerfilIn  = require('../../dtos/OpcionesPerfiles/in/ConsultarOpcionesPerfilIn.dto');
const ConsultarOpcionesPerfilOut   = require('../../dtos/OpcionesPerfiles/out/ConsultarOpcionesPerfilOut.dto');

class ConsultarOpcionesPerfil {
  constructor(opcionesPerfilesRepository) {
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarOpcionesPerfilIn({ ...rawInput, usuarioConsulta: tokenId });
    const opciones = await this.opcionesPerfilesRepository.findByPerfilId(inputDto.id);
    return ConsultarOpcionesPerfilOut.fromEntities(opciones);
  }
}

module.exports = ConsultarOpcionesPerfil;