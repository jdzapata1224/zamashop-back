const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ColoresNotFoundError } = require('../../../domain/exceptions/ColoresErrors');
const ConsultarColoresOut = require('../../dtos/Colores/out/ConsultarColoresOut.dto');
const ConsultarColoresIdIn = require('../../dtos/Colores/in/ConsultarColoresIdIn.dto');

class ConsultarColoresId {
  constructor(coloresRepository) {
    this.coloresRepository = coloresRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarColoresIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const producto = await this.coloresRepository.findById(inputDto.id);
    if (!producto) throw new ColoresNotFoundError(rawInput.id);
    return ConsultarColoresOut.fromEntity(producto);
  }
}

module.exports = ConsultarColoresId;