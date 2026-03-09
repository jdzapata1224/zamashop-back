const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const CambiarEstadoOpcionesIn     = require('../../dtos/Opciones/in/CambiarEstadoOpcionesIn.dto.js');

class CambiarEstadoOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new CambiarEstadoOpcionesIn({ ...rawInput, usuarioActualizacion: tokenId });

    // Verificar que el usuario exista
    const existe = await this.opcionesRepository.findById(inputDto.id);
    if (!existe) throw new OpcionesNotFoundError(rawInput.id);

    // Toggle de estado: true → false / false → true
    const nuevoEstado = !existe.estado;

    const actualizado = await this.opcionesRepository.changeStatus({
      id:                 inputDto.id,
      estado:             nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });

    if (!actualizado) throw new Error('No se pudo actualizar la opción');
  }
}

module.exports = CambiarEstadoOpciones;