const { Types }              = require('mongoose');
const OpcionesUsuariosSchema = require('../models/OpcionesUsuariosSchema');
const OpcionesUsuarios       = require('../../../domain/entities/OpcionesUsuarios');

class OpcionesUsuariosSchemaRepository {

  _toEntity(doc) {
    return new OpcionesUsuarios({
       id:              doc._id.toString(),
      usuarioId:       doc.ous_Usr_Id ? doc.ous_Usr_Id.toString() : null,
      opcionId:        doc.opcionId ? doc.opcionId.toString() : null,
      opcionNombre:    doc.opcionNombre || null,
      fechaCreacion:   doc.ous_Fecha_Creacion,
      usuarioCreacion: doc.ous_Usr_Creacion ? doc.ous_Usr_Creacion.toString() : null,
    });
  }

  async findByUsuarioId(usuarioId) {
    if (!Types.ObjectId.isValid(usuarioId)) return [];
     const docs = await OpcionesUsuariosSchema.aggregate([
      {
        $match: {
          ous_Usr_Id:            new Types.ObjectId(usuarioId),
          ous_Fecha_Eliminacion: { $in: [null, undefined] },
        }
      },
      {
        $lookup: {
          from:         'Opciones',
          localField:   'ous_Opc_Id',
          foreignField: '_id',
          as:           'opcion'
        }
      },
      { $unwind: { path: '$opcion', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          ous_Usr_Id:         1,
          ous_Usr_Creacion:   1,
          ous_Fecha_Creacion: 1,
          opcionId:           '$opcion._id',
          opcionNombre:       '$opcion.opc_Nombre',
        }
      }
    ]);
    return docs.map(doc => this._toEntity(doc));
  }
}

module.exports = OpcionesUsuariosSchemaRepository;