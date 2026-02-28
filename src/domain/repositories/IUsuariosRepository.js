const { NotImplementedError } = require('../exceptions/UsuariosErrors');

class IUsuariosRepository {
  
  async findById(id) { throw new NotImplementedError(); }
}

module.exports = IUsuariosRepository;