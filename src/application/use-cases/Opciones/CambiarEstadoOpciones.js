const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const CambiarEstadoOpcionesIn = require('../../dtos/Opciones/in/CambiarEstadoOpcionesIn.dto.js');

class CambiarEstadoOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoOpcionesIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.opcionesRepository.findById(inputDto.id);
    if (!existe) throw new OpcionesNotFoundError(rawInput.id);

    const actualizado = await this.opcionesRepository.changeStatus({
      id:                   inputDto.id,
      estado:               !existe.estado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la opción');
  
  }
}

module.exports = CambiarEstadoOpciones;