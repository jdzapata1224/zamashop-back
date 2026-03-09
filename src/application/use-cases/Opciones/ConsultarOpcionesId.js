const { UserNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const ConsultarOpcionesOut = require('../../dtos/Opciones/out/ConsultarOpcionesOut.dto');
const ConsultarOpcionesIdIn = require('../../dtos/Usuarios/in/ConsultarOpcionesIdIn.dto');



class ConsultarOpcionesId {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute({ id, usuarioToken }) {
    const { id: tokenId  } = usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new ConsultarOpcionesIdIn(id);
    
    const opcion = await this.opcionesRepository.findById(inputDto.id);
    if (!opcion) throw new UserNotFoundError(rawInput);
    return ConsultarOpcionesOut.fromEntity(opcion);
  }
}

module.exports = ConsultarOpcionesId;