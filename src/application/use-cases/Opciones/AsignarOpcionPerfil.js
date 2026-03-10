const { Types } = require('mongoose');

class AsignarOpcionPerfil {
  constructor(opcionesPerfilesRepository) {
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;
    const { perfilId, opcionId, activo } = rawInput;

    if (!Types.ObjectId.isValid(perfilId)) throw new Error('perfilId inválido');
    if (!Types.ObjectId.isValid(opcionId)) throw new Error('opcionId inválido');
    if (typeof activo !== 'boolean')       throw new Error('activo debe ser true o false');

    const existe = await this.opcionesPerfilesRepository.findByPerfilYOpcion(perfilId, opcionId);

    if (activo) {
      if (existe) throw new Error('La opción ya está asignada al perfil');
      await this.opcionesPerfilesRepository.createOne(perfilId, opcionId, tokenId);
    } else {
      if (!existe) throw new Error('La opción no está asignada al perfil');
      await this.opcionesPerfilesRepository.deleteOne(perfilId, opcionId);
    }
  }
}

module.exports = AsignarOpcionPerfil;