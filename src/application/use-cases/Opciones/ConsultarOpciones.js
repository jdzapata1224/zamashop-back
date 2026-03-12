const { EmptyResultError } = require('../../../domain/exceptions/OpcionesErrors');
const ConsultarOpcionesOut = require('../../dtos/Opciones/out/ConsultarOpcionesOut.dto');

class ConsultarOpciones {
  constructor(opcionesRepository) {
    this.opcionesRepository = opcionesRepository;
  }

  async execute() {
    const opcion = await this.opcionesRepository.find();
    if (!opcion || opcion.length === 0) throw new EmptyResultError();
    return ConsultarOpcionesOut.fromEntities(opcion);
  }
}

module.exports = ConsultarOpciones;