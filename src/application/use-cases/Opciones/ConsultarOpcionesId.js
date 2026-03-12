const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const ConsultarOpcionesOut  = require('../../dtos/Opciones/out/ConsultarOpcionesOut.dto');
const ConsultarOpcionesIdIn = require('../../dtos/Opciones/in/ConsultarOpcionesIdIn.dto');

class ConsultarOpcionesId {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const inputDto = new ConsultarOpcionesIdIn(rawInput);
    const opcion = await this.opcionesRepository.findById(inputDto.id);
    if (!opcion) throw new UserNotFoundError(rawInput);
    return ConsultarOpcionesOut.fromEntity(opcion);
  }
}

module.exports = ConsultarOpcionesId;