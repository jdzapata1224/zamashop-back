const { UserEmptyError } = require('../../../domain/exceptions/UsuariosErrors');
const ConsultarUsuariosOut = require('../../dtos/Usuarios/out/ConsultarUsuariosOut.dto');



class ConsultarUsuarios {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async execute({ usuarioToken }) {
    const { id} = usuarioToken;
    
    if (!id) throw new Error('Token inválido: id de usuario no encontrado');

    const users = await this.usuarioRepository.find();
    if (!users || users.length === 0) throw new UserEmptyError();
    return ConsultarUsuariosOut.fromEntities(users);
  }
}

module.exports = ConsultarUsuarios;