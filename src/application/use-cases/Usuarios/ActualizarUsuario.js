const { UserAlreadyExistsError } = require('../../../domain/exceptions/UsuariosErrors');
const ActualizarUsuarioIn = require('../../dtos/Usuarios/in/ActualizarUsuarioIn.dto');



class ActualizarUsuario {
   constructor(usuarioRepository, opcionesPerfilesRepository, opcionesUsuariosRepository) {
    this.usuarioRepository          = usuarioRepository;
    this.opcionesPerfilesRepository = opcionesPerfilesRepository;
    this.opcionesUsuariosRepository = opcionesUsuariosRepository;
  }

  async execute(rawInput) {
    const { id: tokenId } = rawInput.usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new ActualizarUsuarioIn({ ...rawInput, usuarioActualizacion: tokenId });

    const existe = await this.usuarioRepository.findById(inputDto.id.toString());
    if (!existe) throw new UserNotFoundError();

    const otroPorIdentificacion = await this.usuarioRepository.findByIdentificacion(inputDto.identificacion);
    if (otroPorIdentificacion && otroPorIdentificacion.id !== inputDto.id.toString()) {
      throw new Error('La identificacion ya está en uso por otro usuario');
    }
    
    const actualizado = await this.usuarioRepository.update(inputDto);

    if (!actualizado) throw new Error('No se pudo actualizar el usuario');
    
    const perfilCambio = existe.perfilId?.toString() !== inputDto.perfil.toString();
    if (perfilCambio) {
      await this.opcionesUsuariosRepository.deleteByUsuarioId(inputDto.id.toString(), tokenId);

      const opcionesPerfil = await this.opcionesPerfilesRepository.findByPerfilId(inputDto.perfil);
      if (opcionesPerfil.length > 0) {
        await this.opcionesUsuariosRepository.createMany(inputDto.id.toString(), opcionesPerfil, tokenId);
      }
    }

  }
}

module.exports = ActualizarUsuario;