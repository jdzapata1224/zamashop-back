const { NotImplementedError } = require('../exceptions/UsuariosErrors');

class IUsuariosRepository {
  
  async findById(id) { throw new NotImplementedError(); }
  async find() { throw new NotImplementedError(); }
  async create(data)  { throw new NotImplementedError(); }
  async findByUsuarioOrIdentificacion(usuario, identificacion) { throw new NotImplementedError(); }


}

module.exports = IUsuariosRepository;