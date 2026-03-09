const { Types }              = require('mongoose');

class OpcionesPerfilesSchemaRepository {

  _toEntity(doc) {
    return new OpcionesPerfiles({
      id:              doc._id.toString(),
      perfilId:       doc.opr_Prf_Id ? doc.opr_Prf_Id.toString() : null,
      opcionId:        doc.opr_Opc_Id ? doc.opr_Opc_Id.toString() : null,
      fechaCreacion:   doc.opr_Fecha_Creacion,
      usuarioCreacion: doc.opr_Usr_Creacion ? doc.opr_Usr_Creacion.toString() : null,
    });
  }

  async findByUsuarioId(perfilId) {
    if (!Types.ObjectId.isValid(perfilId)) return [];
    const docs = await OpcionesPerfilesSchema.find({
      opr_Prf_Id:           new Types.ObjectId(perfilId),
      opr_Fecha_Eliminacion: { $in: [null, undefined] },
    });
    return docs.map(doc => this._toEntity(doc));
  }
}

module.exports = OpcionesPerfilesSchemaRepository;