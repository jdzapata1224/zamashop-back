const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');
const ConsultarUsuarioIdIn = require('../../dtos/Usuarios/in/ConsultarUsuarioIdIn.dto');



class ConsultarUsuariosId {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute({ id, usuarioToken }) {
    const { id: tokenId  } = usuarioToken;

    if (!tokenId) throw new Error('Token inválido: id de usuario no encontrado');

    const inputDto = new ConsultarUsuarioIdIn(id);
    
    const user = await this.usuarioRepository.findById(inputDto.id);
    if (!user) throw new UserNotFoundError(rawInput);
    return ConsultarUsuariosOut.fromEntity(user);
  }
}

module.exports = ConsultarUsuariosId;