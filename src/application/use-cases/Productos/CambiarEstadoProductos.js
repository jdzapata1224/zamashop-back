const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoNotFoundError } = require('../../../domain/exceptions/ProductosErrors');
const CambiarEstadoProductosIn = require('../../dtos/Productos/in/CambiarEstadoProductosIn.dto');

class CambiarEstadoProductos {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoProductosIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.productoRepository.findById(inputDto.id);
    if (!existe) throw new CategoriaNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.productoRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoProductos;