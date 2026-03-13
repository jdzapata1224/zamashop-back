const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ColoresNotFoundError } = require('../../../domain/exceptions/ColoresErrors');
const CambiarEstadoColoresIn = require('../../dtos/Colores/in/CambiarEstadoColoresIn.dto');

class CambiarEstadoColores {
  constructor(coloresRepository) {
    this.coloresRepository = coloresRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoColoresIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.coloresRepository.findById(inputDto.id);
    if (!existe) throw new ColoresNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.coloresRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoColores;