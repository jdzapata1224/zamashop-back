const { extractTokenId } = require('../../../infrastructure/utils/basic.util');
const { ProductoVariacionNotFoundError, ProductoVariacionAlreadyExistsError } = require('../../../domain/exceptions/ProductoVariacionErrors');
const ActualizarProductoVariacionIn = require('../../dtos/ProductoVariacion/in/ActualizarProductoVariacionIn.dto');



class ActualizarProductoVariacion {
   constructor(productoVariacionRepository) {
    this.productoVariacionRepository          = productoVariacionRepository;
  }

  async execute(rawInput) {
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarProductoVariacionIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.productoVariacionRepository.findById(inputDto.id);
    if (!existe) throw new ProductoVariacionNotFoundError(inputDto.id);

    const otroPorNombre = await this.productoVariacionRepository.findByPrdTalCol(inputDto.productoId,inputDto.tallaId,inputDto.colorId);
    if (otroPorNombre && otroPorNombre.id !== inputDto.id) {
      throw new ProductoVariacionAlreadyExistsError();
    }
    
    const actualizado = await this.productoVariacionRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar la categoría');

  }
}

module.exports = ActualizarProductoVariacion;