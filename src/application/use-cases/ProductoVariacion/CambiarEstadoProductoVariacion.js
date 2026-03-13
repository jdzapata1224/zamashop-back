const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoVariacionNotFoundError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const CambiarEstadoProductoVariacionIn = require('../../dtos/ProductoVariacion/in/CambiarEstadoProductoVariacionIn.dto');

class CambiarEstadoProductoVariacion {
  constructor(productoVariacionRepository) {
    this.productoVariacionRepository = productoVariacionRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new CambiarEstadoProductoVariacionIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.productoVariacionRepository.findById(inputDto.id);
    if (!existe) throw new ProductoVariacionNotFoundError(rawInput.id);
    
    const nuevoEstado = !existe.estado;

    const actualizado = await this.productoVariacionRepository.changeStatus({
      id:                   inputDto.id,
      estado:               nuevoEstado,
      usuarioActualizacion: inputDto.usuarioActualizacion,
    });
    if (!actualizado) throw new Error('No se pudo cambiar el estado de la categoría');
  }
}

module.exports = CambiarEstadoProductoVariacion;