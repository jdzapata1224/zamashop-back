const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { TallasNotFoundError } = require('../../../domain/exceptions/TallasErrors');
const CambiarEstadoTallasIn = require('../../dtos/Tallas/in/CambiarEstadoTallasIn.dto');

class CambiarEstadoTallas {
  constructor(tallasRepository) {
    this.tallasRepository = tallasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoTallasIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.tallasRepository.findById(inputDto.id);
    if (!existe) throw new TallasNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.tallasRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoTallas;