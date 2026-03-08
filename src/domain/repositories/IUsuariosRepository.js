const { NotImplementedError } = require('../exceptions/UsuariosErrors');

class IUsuariosRepository {
  
  async findById(id) { throw new NotImplementedError(); }
  async find() { throw new NotImplementedError(); }
  async create(data)  { throw new NotImplementedError(); }
  async findByUsuarioOrIdentificacion(usuario, identificacion) { throw new NotImplementedError(); }
  async changeStatus(id) { throw new NotImplementedError(); }

  async delete(id) { throw new NotImplementedError(); }

}

module.exports = IUsuariosRepository;