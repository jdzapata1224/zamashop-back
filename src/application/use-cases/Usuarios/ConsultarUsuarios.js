const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');



class ConsultarUsuarios {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute() {
    
    const user = await this.usuarioRepository.find();
    if (!user) throw new UserNotFoundError();
    return ConsultarUsuariosOut.fromEntity(user);
  }
}

module.exports = ConsultarUsuarios;