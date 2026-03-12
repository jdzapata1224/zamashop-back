const { OpcionesAlreadyExistsError } = require('../../../domain/exceptions/OpcionesErrors');
const CrearOpcionesIn = require('../../dtos/Opciones/in/CrearOpcionesIn.dto');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');



class CrearOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CrearOpcionesIn({ ...rawInput, usuarioCreacion: tokenId });
    const existeCodigo = await this.opcionesRepository.findByCodigo(inputDto.codigo);
    if (existeCodigo) throw new OpcionesAlreadyExistsError();
   
    const creado =await this.opcionesRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la opción');

  }
}

module.exports = CrearOpciones;