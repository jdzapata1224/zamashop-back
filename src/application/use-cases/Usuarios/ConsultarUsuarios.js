const { UserNotFoundError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');



class ConsultarUsuarios {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute() {
    
    const users = await this.usuarioRepository.find();
    if (!users || users.length === 0) throw new UserNotFoundError();
    return ConsultarUsuariosOut.fromEntities(users);
  }
}

module.exports = ConsultarUsuarios;