const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { TallasAlreadyExistsError } = require('../../../domain/exceptions/TallasErrors');
const CrearTallasIn = require('../../dtos/Tallas/in/CrearTallasIn.dto');
const CrearTallasOut = require('../../dtos/Tallas/out/CrearTallasOut.dto');


class CrearTallas {
  constructor(tallasRepository) {
    this.tallasRepository = tallasRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearTallasIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.tallasRepository.findByNombre(inputDto.nombre);
    if (existeNombre) throw new TallasAlreadyExistsError();

    const creado = await this.tallasRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');
    return new CrearTallasOut(creado);

  }
}

module.exports = CrearTallas;