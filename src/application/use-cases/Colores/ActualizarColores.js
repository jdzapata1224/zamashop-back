const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ColoresNotFoundError, ColoresAlreadyExistsError } = require('../../../domain/exceptions/ColoresErrors');
const ActualizarColoresIn = require('../../dtos/Colores/in/ActualizarColoresIn.dto');



class ActualizarColores {
   constructor(coloresRepository) {
    this.coloresRepository          = coloresRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarColoresIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.coloresRepository.findById(inputDto.id);
    if (!existe) throw new ColoresNotFoundError(inputDto.id);

    const otroPorNombre = await this.coloresRepository.findByNombre(inputDto.nombre);
    if (otroPorNombre && otroPorNombre.id !== inputDto.id) {
      throw new ColoresAlreadyExistsError();
    }
    
    const actualizado = await this.coloresRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarColores;