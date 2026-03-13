const { ColoresEmptyError } = require('../../../domain/exceptions/ColoresErrors');
const ConsultarColoresOut = require('../../dtos/Colores/out/ConsultarColoresOut.dto');

class ConsultarColores {
  constructor(coloresRepository) {
    this.coloresRepository = coloresRepository;
  }

  async execute() {
    const Colores = await this.coloresRepository.find();
    if (!Colores || Colores.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarColoresOut.fromEntities(Colores);
  }
}

module.exports = ConsultarColores;