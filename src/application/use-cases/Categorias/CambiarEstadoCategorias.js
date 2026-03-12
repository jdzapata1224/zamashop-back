const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { CategoriaNotFoundError } = require('../../../domain/exceptions/CategoriasErrors');
const CambiarEstadoCategoriasIn = require('../../dtos/Categorias/in/CambiarEstadoCategoriasIn.dto');

class CambiarEstadoCategorias {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoCategoriasIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.categoriaRepository.findById(inputDto.id);
    if (!existe) throw new CategoriaNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.categoriaRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoCategorias;