const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const ActualizarUsuarioIn = require('../../dtos/Usuarios/in/ActualizarUsuarioIn.dto');
const { toObjectId } = require('../../../infrastructure/utils/basic.util');
const { extractTokenId } = require('../../../infrastructure/utils/basic.util');



class ActualizarUsuario {
   constructor(usuarioRepository, opcionesPerfilesRepository, opcionesUsuariosRepository) {
    this.usuarioRepository          = usuarioRepository;
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    
    const tokenId  = extractTokenId(rawInput);
    const inputDto = new ActualizarUsuarioIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.usuarioRepository.findById(inputDto.id);
    if (!existe) throw new UserNotFoundError();

    const otroPorIdentificacion = await this.usuarioRepository.findByIdentificacion(inputDto.identificacion);
    if (otroPorIdentificacion && otroPorIdentificacion.id !== inputDto.id) {
      throw new Error('La identificacion ya está en uso por otro usuario');
    }
    
    const actualizado = await this.usuarioRepository.update(inputDto);
    if (!actualizado) throw new Error('No se pudo actualizar el usuario');

    const perfilCambio = toObjectId(existe.perfilId) !== inputDto.perfil;
    if (perfilCambio) {
      await this.opcionesUsuariosRepository.deleteByUsuarioId(inputDto.id);

      const opcionesPerfil = await this.opcionesPerfilesRepository.findByPerfilId(inputDto.perfil);
      if (opcionesPerfil.length > 0) {
        await this.opcionesUsuariosRepository.createMany(inputDto.id, opcionesPerfil, tokenId);
      }
    }

  }
}

module.exports = ActualizarUsuario;