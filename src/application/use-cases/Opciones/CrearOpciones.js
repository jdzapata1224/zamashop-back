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
    const existeIdentificacion = await this.opcionesRepository.findByIdentificacion(inputDto.identificacion);
    if (existeIdentificacion) throw new OpcionesAlreadyExistsError();
   
       // Generar usuario único: jzapata → jzapata1 → jzapata2 ...
       let usuarioFinal = inputDto.usuarioBase;
       let contador = 0;
   
       while (await this.opcionesRepository.findByUsuario(usuarioFinal)) {
         contador++;
         usuarioFinal = `${inputDto.usuarioBase}${contador}`;
       }
   
    inputDto.usuario = usuarioFinal;
    const creado =await this.opcionesRepository.create(inputDto);
    if (!creado) throw new Error('No se pudo crear la opción');

  }
}

module.exports = CrearOpciones;