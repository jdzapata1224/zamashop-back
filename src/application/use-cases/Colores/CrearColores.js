const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ColoresAlreadyExistsError } = require('../../../domain/exceptions/ColoresErrors');
const CrearColoresIn = require('../../dtos/Colores/in/CrearColoresIn.dto');
const CrearColoresOut = require('../../dtos/Colores/out/CrearColoresOut.dto');


class CrearColores {
  constructor(coloresRepository) {
    this.coloresRepository = coloresRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearColoresIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.coloresRepository.findByNombre(inputDto.nombre);
    if (existeNombre) throw new ColoresAlreadyExistsError();

    const creado = await this.coloresRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');
    return new CrearColoresOut(creado);

  }
}

module.exports = CrearColores;