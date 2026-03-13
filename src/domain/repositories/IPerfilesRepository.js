const { NotImplementedError } = require('../exceptions/PerfilesErrors');

class IPerfilesRepository {
  
  async findById(id) { throw new NotImplementedError(); }
  async findByNombre(nombre) { throw new NotImplementedError(); }
  async find() { throw new NotImplementedError(); }
  async create(data)  { throw new NotImplementedError(); }
  async changeStatus(id) { throw new NotImplementedError(); }
  async update(data)  { throw new NotImplementedError(); }
  async delete(id) { throw new NotImplementedError(); }

}

module.exports = IPerfilesRepository;