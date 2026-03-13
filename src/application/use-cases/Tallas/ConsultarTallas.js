const ConsultarTallasOut = require('../../dtos/Tallas/out/ConsultarTallasOut.dto');

class ConsultarTallas {
  constructor(tallasRepository) {
    this.tallasRepository = tallasRepository;
  }

  async execute() {
    const Tallas = await this.tallasRepository.find();
    if (!Tallas || Tallas.length === 0) throw new Error('No hay informacion para mostrar');
    return ConsultarTallasOut.fromEntities(Tallas);
  }
}

module.exports = ConsultarTallas;