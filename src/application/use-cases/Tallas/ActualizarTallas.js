const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { TallasNotFoundError, TallasAlreadyExistsError } = require('../../../domain/exceptions/TallasErrors');
const ActualizarTallasIn = require('../../dtos/Tallas/in/ActualizarTallasIn.dto');



class ActualizarTallas {
   constructor(tallasRepository) {
    this.tallasRepository          = tallasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarTallasIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.tallasRepository.findById(inputDto.id);
    if (!existe) throw new TallasNotFoundError(inputDto.id);

    const otroPorNombre = await this.tallasRepository.findByNombre(inputDto.nombre);
    if (otroPorNombre && otroPorNombre.id !== inputDto.id) {
      throw new TallasAlreadyExistsError();
    }
    
    const actualizado = await this.tallasRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarTallas;