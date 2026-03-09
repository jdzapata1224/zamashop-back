const { Types }              = require('mongoose');

class OpcionesUsuariosSchemaRepository {

  _toEntity(doc) {
    return new OpcionesUsuarios({
      id:              doc._id.toString(),
      usuarioId:       doc.ous_Usr_Id ? doc.ous_Usr_Id.toString() : null,
      opcionId:        doc.ous_Opc_Id ? doc.ous_Opc_Id.toString() : null,
      fechaCreacion:   doc.ous_Fecha_Creacion,
      usuarioCreacion: doc.ous_Usr_Creacion ? doc.ous_Usr_Creacion.toString() : null,
    });
  }

  async findByUsuarioId(usuarioId) {
    if (!Types.ObjectId.isValid(usuarioId)) return [];
    const docs = await OpcionesUsuariosSchema.find({
      ous_Usr_Id:           new Types.ObjectId(usuarioId),
      ous_Fecha_Eliminacion: { $in: [null, undefined] },
    });
    return docs.map(doc => this._toEntity(doc));
  }
}

module.exports = OpcionesUsuariosSchemaRepository;