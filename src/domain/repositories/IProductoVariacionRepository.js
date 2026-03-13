const { NotImplementedError } = require('../exceptions/UsuariosErrors');

class IProductoVariacionRepository {
  
  async findById(id) { throw new NotImplementedError(); }
  async findByPrdTalCol(productoId,tallaId,colorId) { throw new NotImplementedError(); }
  async find() { throw new NotImplementedError(); }
  async create(data)  { throw new NotImplementedError(); }
  async changeStatus(id) { throw new NotImplementedError(); }
  async update(data)  { throw new NotImplementedError(); }
  async delete(id) { throw new NotImplementedError(); }

}

module.exports = IProductoVariacionRepository;