const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const EliminarOpcionesIn     = require('../../dtos/Opciones/in/EliminarOpcionesIn.dto');

class EliminarOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new EliminarOpcionesIn({ ...rawInput, usuarioEliminacion: tokenId });

    // Verificar que el usuario exista
    const existe = await this.opcionesRepository.findById(inputDto.id);
    if (!existe) throw new OpcionesNotFoundError(rawInput.id);

    // Toggle de estado: true → false / false → true

    const eliminado = await this.opcionesRepository.delete({
      id:                 inputDto.id,
      usuarioEliminacion: inputDto.usuarioEliminacion,
    });

    if (!eliminado) throw new Error('No se pudo actualizar la opción');
  }
}

module.exports = EliminarOpciones;