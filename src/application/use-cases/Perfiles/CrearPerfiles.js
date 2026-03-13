const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { PerfilesAlreadyExistsError } = require('../../../domain/exceptions/PerfilesErrors');
const CrearPerfilesIn = require('../../dtos/Perfiles/in/CrearPerfilesIn.dto');


class CrearPerfiles {
  constructor(PerfilesRepository) {
    this.PerfilesRepository = PerfilesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearPerfilesIn({ ...rawInput, usuarioCreacion: tokenId });

    const existeNombre = await this.PerfilesRepository.findByNombre(inputDto.nombre);
    if (existeNombre) throw new PerfilesAlreadyExistsError();

    const creado = await this.PerfilesRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la categoría');

  }
}

module.exports = CrearPerfiles;