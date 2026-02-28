class ConsultarUsuariosIdInDTO {
  constructor(id) {
    if (!id || typeof id !== 'string') {
      throw new Error('id must be a non-empty string');
    }
    this.id = id;
  }
}
module.exports = ConsultarUsuariosIdInDTO;