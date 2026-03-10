const { Types } = require('mongoose');

class AsignarOpcionUsuario {
  constructor(opcionesUsuariosRepository) {
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;
    const { usuarioId, opcionId, activo } = rawInput;

    if (!Types.ObjectId.isValid(usuarioId)) throw new Error('usuarioId inválido');
    if (!Types.ObjectId.isValid(opcionId))  throw new Error('opcionId inválido');
    if (typeof activo !== 'boolean')        throw new Error('activo debe ser true o false');

    const existe = await this.opcionesUsuariosRepository.findByUsuarioYOpcion(usuarioId, opcionId);

    if (activo) {
      if (existe) throw new Error('La opción ya está asignada al usuario');
      await this.opcionesUsuariosRepository.createOne(usuarioId, opcionId, tokenId);
    } else {
      if (!existe) throw new Error('La opción no está asignada al usuario');
      await this.opcionesUsuariosRepository.deleteOne(usuarioId, opcionId);
    }
  }
}

module.exports = AsignarOpcionUsuario;