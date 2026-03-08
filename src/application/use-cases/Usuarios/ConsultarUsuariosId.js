const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');
const ConsultarUsuarioIdInDTO = require('../../dtos/Usuarios/in/ConsultarUsuarioIdInDTO.dto');



class ConsultarUsuariosId {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    const inputDto = new ConsultarUsuarioIdInDTO(rawInput);
    
    const user = await this.usuarioRepository.findById(inputDto.id);
    if (!user) throw new UserNotFoundError(rawInput);
    return ConsultarUsuariosOut.fromEntity(user);
  }
}

module.exports = ConsultarUsuariosId;