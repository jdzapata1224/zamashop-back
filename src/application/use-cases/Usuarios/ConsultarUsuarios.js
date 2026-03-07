const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');



class ConsultarUsuarios {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute(rawInput) {
    
    const user = await this.usuarioRepository.find({"use_Fecha_Eliminacion": null});
    if (!user) throw new UserNotFoundError(rawInput);
    return ConsultarUsuariosOut.fromEntity(user);
  }
}

module.exports = ConsultarUsuarios;