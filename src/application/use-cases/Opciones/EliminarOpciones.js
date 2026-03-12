const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const EliminarOpcionesIn     = require('../../dtos/Opciones/in/EliminarOpcionesIn.dto');

class EliminarOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new EliminarOpcionesIn({ ...rawInput, usuarioEliminacion: tokenId });

    const existe = await this.opcionesRepository.findById(inputDto.id);
    if (!existe) throw new OpcionesNotFoundError(rawInput.id);

    const eliminado = await this.opcionesRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });

    if (!eliminado) throw new Error('No se pudo actualizar la opción');
  }
}

module.exports = EliminarOpciones;