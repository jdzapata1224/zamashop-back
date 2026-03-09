const { NotImplementedError } = require('../exceptions/OpcionesErrors');

class IOpcionesRepository {
  
  async findById(id) { throw new NotImplementedError(); }
  async find() { throw new NotImplementedError(); }
  async create(data)  { throw new NotImplementedError(); }
  async changeStatus(id) { throw new NotImplementedError(); }

  async delete(id) { throw new NotImplementedError(); }

}

module.exports = IOpcionesRepository;