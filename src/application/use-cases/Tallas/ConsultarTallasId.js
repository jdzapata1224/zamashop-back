const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { TallasNotFoundError } = require('../../../domain/exceptions/TallasErrors');
const ConsultarTallasOut = require('../../dtos/Tallas/out/ConsultarTallasOut.dto');
const ConsultarTallasIdIn = require('../../dtos/Tallas/in/ConsultarTallasIdIn.dto');

class ConsultarTallasId {
  constructor(tallasRepository) {
    this.tallasRepository = tallasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarTallasIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const producto = await this.tallasRepository.findById(inputDto.id);
    if (!producto) throw new TallasNotFoundError(rawInput.id);
    return ConsultarTallasOut.fromEntity(producto);
  }
}

module.exports = ConsultarTallasId;