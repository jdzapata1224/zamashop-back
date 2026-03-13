const { PerfilesEmptyError } = require('../../../domain/exceptions/PerfilesErrors');
const ConsultarPerfilesOut = require('../../dtos/Perfiles/out/ConsultarPerfilesOut.dto');

class ConsultarPerfiles {
  constructor(perfilesRepository) {
    this.perfilesRepository = perfilesRepository;
  }

  async execute() {
    const Perfiles = await this.perfilesRepository.find();
    if (!Perfiles || Perfiles.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarPerfilesOut.fromEntities(Perfiles);
  }
}

module.exports = ConsultarPerfiles;