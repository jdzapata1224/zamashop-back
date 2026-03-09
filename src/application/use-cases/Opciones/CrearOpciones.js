const { OpcionesAlreadyExistsError } = require('../../../domain/exceptions/OpcionesErrors');
const CrearOpcionesIn = require('../../dtos/Opciones/in/CrearOpcionesIn.dto');



class CrearOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new CrearOpcionesIn({ ...rawInput, usuarioCreacion: tokenId });
    const existeCodigo = await this.opcionesRepository.findByCodigo(inputDto.codigo);
    if (existeCodigo) throw new OpcionesAlreadyExistsError();
   
    const creado =await this.opcionesRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la opción');

  }
}

module.exports = CrearOpciones;