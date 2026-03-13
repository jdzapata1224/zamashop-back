const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesNotFoundError } = require('../../../domain/exceptions/PerfilesErrors');
const ConsultarPerfilesOut = require('../../dtos/Perfiles/out/ConsultarPerfilesOut.dto');
const ConsultarPerfilesIdIn = require('../../dtos/Perfiles/in/ConsultarPerfilesIdIn.dto');

class ConsultarPerfilesId {
  constructor(PerfilesRepository) {
    this.PerfilesRepository = PerfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ConsultarPerfilesIdIn({ ...rawInput, usuarioConsulta: tokenId });
    const producto = await this.PerfilesRepository.findById(inputDto.id);
    if (!producto) throw new PerfilesNotFoundError(rawInput.id);
    return ConsultarPerfilesOut.fromEntity(producto);
  }
}

module.exports = ConsultarPerfilesId;