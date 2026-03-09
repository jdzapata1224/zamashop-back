const { OpcionesNotFoundError } = require('../../../domain/exceptions/OpcionesErrors');
const ConsultarOpcionesOut = require('../../dtos/Opciones/out/ConsultarOpcionesOut.dto');



class ConsultarOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute({ usuarioToken }) {
    const { id} = usuarioToken;
    
    if (!id) throw new Error('Token inválido: id de usuario no encontrado');

    const opcion = await this.opcionesRepository.find();
    if (!opcion || opcion.length === 0) throw new OpcionesNotFoundError();
    return ConsultarOpcionesOut.fromEntities(opcion);
  }
}

module.exports = ConsultarOpciones;